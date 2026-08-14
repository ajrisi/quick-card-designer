const CACHE_NAME = 'qcd-cache-v2';

const URLS_TO_CACHE = [
    './',
    './index.html',
    './libs/js/qrcode.js'
];

const PLUGIN_REPO_BASE = './plugins/';
const PLUGIN_LIST_URL = PLUGIN_REPO_BASE + 'list.json';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(async (cache) => {
                // 1. Cache base app files
                await cache.addAll(URLS_TO_CACHE);

                // 2. Fetch and cache the plugin repository list and its files
                try {
                    // Add a cache-buster query param so the Service Worker always requests the absolute newest list.json during installation
                    const listResponse = await fetch(PLUGIN_LIST_URL + '?_t=' + Date.now());
                    if (listResponse.ok) {
                        // Cache the list itself
                        await cache.put(PLUGIN_LIST_URL, listResponse.clone());
                        
                        // Parse and pre-cache each individual plugin
                        const list = await listResponse.json();
                        const pluginUrls = list.map(p => {
                            const filename = p.filename || (p.name + '.js');
                            return PLUGIN_REPO_BASE + filename;
                        });
                        
                        await cache.addAll(pluginUrls);
                    }
                } catch (err) {
                    console.warn("Service Worker: Could not pre-cache plugin repository", err);
                }
            })
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(async (cacheNames) => {
            const newCache = await caches.open(CACHE_NAME);
            const newKeys = await newCache.keys();
            const newUrls = new Set(newKeys.map(req => req.url));

            return Promise.all(
                cacheNames.map(async (cacheName) => {
                    // If this is an older cache version...
                    if (cacheName !== CACHE_NAME) {
                        const oldCache = await caches.open(cacheName);
                        const oldRequests = await oldCache.keys();
                        
                        // Rescue any cached resources that weren't already replaced by the new install phase
                        for (const req of oldRequests) {
                            if (!newUrls.has(req.url)) {
                                const response = await oldCache.match(req);
                                if (response) {
                                    await newCache.put(req, response);
                                }
                            }
                        }
                        
                        // Delete the old cache only after migrating everything safely
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    // Only handle requests for our app or the official plugin repository
    if (!event.request.url.startsWith(self.location.origin) && !event.request.url.startsWith(PLUGIN_REPO_BASE)) {
        return;
    }

    // NETWORK-FIRST STRATEGY: Try online first, fallback to cache if offline
    event.respondWith(
        fetch(event.request)
            .then((networkResponse) => {
                // If the network request is successful, clone the fresh response and update the cache
                if (networkResponse && networkResponse.status === 200 && (networkResponse.type === 'basic' || networkResponse.type === 'cors')) {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return networkResponse;
            })
            .catch(() => {
                // If the network request fails (e.g., offline), serve from the cache
                return caches.match(event.request).then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    // Prevent 'Failed to convert value to Response' TypeError by supplying a fallback
                    return new Response(
                        "Network error and resource is not cached.",
                        { status: 503, statusText: "Service Unavailable" }
                    );
                });
            })
    );
});
