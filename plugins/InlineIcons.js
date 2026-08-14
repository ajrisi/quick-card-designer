// Quick Card Designer Plugin: Inline Iconography
// Automatically replaces text keywords (like [HP] or [GOLD]) with inline icons!
(function() {

    // =========================================================================
    // ICON DICTIONARY
    // Define your keywords and the image URLs they should be replaced with.
    // You can use standard web URLs (https://...), Base64 strings, or SVG Data URIs.
    // =========================================================================
    const ICONS = {
        "[HP]": "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ef4444'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E",
        "[GOLD]": "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23eab308'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Ccircle cx='12' cy='12' r='6' fill='%23fef08a'/%3E%3C/svg%3E",
        "[MANA]": "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%233b82f6'%3E%3Cpath d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/%3E%3C/svg%3E",
        "[ATK]": "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236b7280'%3E%3Cpath d='M19.707 4.293a1 1 0 00-1.414 0l-7 7-1.414-1.414a1 1 0 00-1.414 1.414l1.414 1.414-5.586 5.586a2 2 0 002.828 2.828l5.586-5.586 1.414 1.414a1 1 0 001.414-1.414l-1.414-1.414 7-7a1 1 0 000-1.414zM10.586 14.828l-1.414-1.414 4.293-4.293 1.414 1.414-4.293 4.293z'/%3E%3C/svg%3E",
        "[DEF]": "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23374151'%3E%3Cpath d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'/%3E%3C/svg%3E"
    };
    // =========================================================================

    return {
        register: function() {
            return {
                name: "InlineIcons",
                description: "Replaces text keywords like [HP] or [GOLD] with inline images that scale with your font.",
                doc: "### Inline Icon Replacer\n\nAutomatically swaps out specific text keywords with inline icons seamlessly embedded inside your sentences.\n\n**How to use:**\n1. Type any mapped keyword into a Text Box or Table Cell (e.g., `Take 2 [HP] damage.`).\n2. The plugin automatically converts `[HP]` into a red heart icon that perfectly matches your current font size!\n\n**Included Defaults:**\n* `[HP]` (Red Heart)\n* `[GOLD]` (Yellow Coin)\n* `[MANA]` (Blue Star)\n* `[ATK]` (Sword)\n* `[DEF]` (Shield)\n\n*(Note: You can easily add your own custom image URLs or keywords by editing the `ICONS` array at the top of this plugin's script!)*",
                minRecords: 0,
                varnames: [],
                images: []
            };
        },

        render: function(cardElement, context) {
            const root = cardElement || document;
            
            // Skip the currently focused element so we don't ruin the user's cursor position while actively typing
            const activeEl = document.activeElement;

            // Target all text nodes that hold visual ink
            const textNodes = root.querySelectorAll('.cell-text, div[contenteditable="true"], .qcd-text-format-target');
            
            textNodes.forEach(node => {
                if (node === activeEl) return;

                let html = node.innerHTML;
                let changed = false;

                // Scan and replace all defined keywords
                for (let keyword in ICONS) {
                    const safeKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape for regex
                    const regex = new RegExp(safeKeyword, 'g');
                    
                    if (regex.test(html)) {
                        // The 'em' unit guarantees the image scales dynamically if the user changes the font size!
                        const imgTag = `<img src="${ICONS[keyword]}" style="height: 1.2em; display: inline-block; vertical-align: -0.2em; margin: 0 0.1em; pointer-events: none;" alt="${keyword}">`;
                        html = html.replace(regex, imgTag);
                        changed = true;
                    }
                }

                if (changed) {
                    node.innerHTML = html;
                }
            });
        }
    };
})();