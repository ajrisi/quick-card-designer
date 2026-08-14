// Quick Card Designer Plugin: Auto-Fit Text
// Automatically shrinks text to fit perfectly inside its bounding box without overflowing.
(function() {
    return {
        register: function() {
            return {
                name: "AutoFitText",
                description: "Automatically shrinks text to fit perfectly inside its bounding box.",
                doc: "### Auto-Fit Text Engine\n\nPrevents long text from spilling out of its box by dynamically shrinking the font size. Perfect for dynamic CSV data where text lengths vary wildly!\n\n**Usage:**\n1. Select a Text Box, Title, or Table.\n2. Set its **Tags** in the top toolbar to include `autofit`.\n3. The plugin will automatically measure the text on every card. If the text is taller than the box, it will smoothly step down the font size until it fits perfectly.",
                minRecords: 0,
                varnames: [],
                images: []
            };
        },

        render: function(cardElement, context) {
            const root = cardElement || document;
            
            // Updated to use the new Tags system
            const targets = Array.from(root.querySelectorAll('[data-tags]')).filter(el => 
                el.getAttribute('data-tags').toLowerCase().includes('autofit')
            );

            if (targets.length === 0) return;

            // During export and grid generation, the app passes an offline, unattached DOM node.
            // Browsers refuse to calculate .scrollHeight or getComputedStyle() on unattached nodes!
            // We must temporarily mount the offline card to the live document inside a hidden box
            // that exactly matches the real canvas dimensions.
            const isDetached = !root.isConnected;
            let ghostCanvas = null;

            if (isDetached) {
                ghostCanvas = document.createElement('div');
                const liveCanvas = document.getElementById('card-canvas');
                ghostCanvas.style.cssText = `position: absolute; top: -9999px; left: -9999px; width: ${liveCanvas.style.width}; height: ${liveCanvas.style.height}; visibility: hidden; pointer-events: none;`;
                
                // Mount the offline card to the hidden canvas, and mount the canvas to the live page
                ghostCanvas.appendChild(root);
                document.body.appendChild(ghostCanvas);
            }

            targets.forEach(container => {
                // Find the actual text nodes inside the container
                const textNodes = container.querySelectorAll('.cell-text, div[contenteditable="true"], .qcd-text-format-target');
                
                textNodes.forEach(node => {
                    // 1. Check if the user changed the font size via the UI toolbar
                    const currentInlineSize = node.style.fontSize;
                    if (currentInlineSize && currentInlineSize !== node.dataset.shrunkSize) {
                        // Cache the user's intended maximum size
                        node.dataset.baseFontSize = currentInlineSize;
                    }

                    // 2. Reset the text to its maximum intended size to measure its natural bounds
                    if (node.dataset.baseFontSize) {
                        node.style.fontSize = node.dataset.baseFontSize;
                    }

                    // 3. Grab the starting computed pixel size
                    let currentSize = parseFloat(window.getComputedStyle(node).fontSize) || 16;
                    const minSize = 6; // Absolute minimum legibility threshold
                    let didShrink = false;
                    
                    // 4. Shrink the font iteratively until it fits inside the physical height
                    while (node.scrollHeight > node.clientHeight && currentSize > minSize) {
                        currentSize -= 0.5;
                        node.style.fontSize = currentSize + 'px';
                        didShrink = true;
                    }

                    // 5. Tag the element so we know the plugin modified the size, not the user
                    if (didShrink) {
                        node.dataset.shrunkSize = node.style.fontSize;
                    } else {
                        node.dataset.shrunkSize = '';
                    }
                });
            });

            // Cleanup our temporary mounting wrapper so the app's export engine can safely proceed
            if (isDetached && ghostCanvas) {
                ghostCanvas.remove();
            }
        }
    };
})();