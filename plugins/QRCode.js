// Quick Card Designer Plugin: QR Code Generator
(function() {
    if (!window.QRCode) {
        const script = document.createElement('script');
        script.src = 'libs/js/qrcode.js';
        script.onload = () => {
            if (typeof updateAllCanvasImages === 'function') updateAllCanvasImages();
            if (typeof queueWorkspaceGridUpdate === 'function') queueWorkspaceGridUpdate();
        };
        document.head.appendChild(script);
    }

    const qrCache = new Map();

    return {
        register: function() {
            return {
                name: "QR_Generator",
                description: "Dynamically generates QR codes based on static text or CSV data.",
                doc: "### QR Code Generator\n\nGenerates a QR code image on the fly.\n\n**Usage:**\nMap this plugin to an Image box and supply a URL or JSON config object in the `Args` field. It securely supports nested templates, allowing you to build unique URLs for every single card!\n\n**Examples:**\n* `https://example.com/user/{{MyData.csv, UserID}}`\n* `{ text: 'https://example.com', colorDark: '#ff0000', colorLight: '#ffffff' }`",
                minRecords: 0,
                varnames: [],
                images: ["qr_image"]
            };
        },
        
        // Return an image URL, path, SVG string, or data URI for images
        image: function(imgName, context, ...args) {
            if (imgName !== "qr_image") return "";

            // Re-join the arguments since the host app splits them by commas
            let rawArgs = args.join(',');
            let resolvedArgs = "";
            
            // Default configuration
            let config = {
                text: "https://example.com",
                width: 512,
                height: 512,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: window.QRCode ? QRCode.CorrectLevel.H : 2
            };

            if (rawArgs.trim()) {
                // 1. Pass the raw string through the host app's native template engine!
                if (typeof window.renderTemplateString === 'function') {
                    resolvedArgs = window.renderTemplateString(rawArgs, context.rowIndex);
                } else {
                    resolvedArgs = rawArgs;
                }

                // 2. Safely parse the result into an object
                try {
                    // Using `new Function` allows relaxed JSON (single quotes, no quotes on keys, etc.)
                    let userConfig = new Function("return " + resolvedArgs)();
                    
                    if (typeof userConfig === 'string') {
                        config.text = userConfig;
                    } else if (typeof userConfig === 'object') {
                        config = Object.assign(config, userConfig);
                    }
                } catch(e) {
                    // If it isn't an object/string literal, assume they just typed a raw URL/Template
                    // e.g. {{my_data.csv, link}}
                    config.text = resolvedArgs;
                }
            }

            if (!window.QRCode) {
                return '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="#f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="12" fill="#9ca3af" font-family="sans-serif">Loading QR...</text></svg>';
            }

            // Map string-based correctLevel ("L", "M", "Q", "H") to QRCode constants
            if (typeof config.correctLevel === 'string') {
                const levels = { 'L': QRCode.CorrectLevel.L, 'M': QRCode.CorrectLevel.M, 'Q': QRCode.CorrectLevel.Q, 'H': QRCode.CorrectLevel.H };
                config.correctLevel = levels[config.correctLevel.toUpperCase()] || QRCode.CorrectLevel.H;
            }

            // Serialize the final configuration to use as our cache key
            const cacheKey = JSON.stringify(config);
            if (qrCache.has(cacheKey)) {
                return qrCache.get(cacheKey);
            }

            const tempDiv = document.createElement('div');
            try {
                new QRCode(tempDiv, config);
                const canvas = tempDiv.querySelector('canvas');
                if (canvas) {
                    const dataUri = canvas.toDataURL("image/png");
                    qrCache.set(cacheKey, dataUri);
                    return dataUri;
                }
            } catch(e) {
                console.error("QR Generation failed", e);
            }
            
            return "";
        }
    };
})();