// Quick Card Designer Plugin: Conditional Style Engine
// Easily apply styles, text overrides, or hide elements based on your CSV data!
(function() {

    // =========================================================================
    // CONFIGURATION TABLE
    // Add your custom logic rules here. They run sequentially from top to bottom.
    // =========================================================================
    const RULES = [
        {
            // 1. What element are we targeting? (Set this via "Set Tags" in the app)
            targetTag: "health_bar",
            
            // 2. What condition must be met? 
            //    Use ctx.getCSVValue("filename.csv", "ColumnName")
            condition: function(ctx) {
                // Example: If the 'HP' column is less than 50
                const hp = parseInt(ctx.getCSVValue("characters.csv", "HP")) || 0;
                return hp < 50;
            },
            
            // 3. What styles should apply if the condition is TRUE?
            applyStyle: {
                backgroundColor: "#fee2e2", // Light red background
                color: "#dc2626",           // Dark red text
                border: "2px solid #dc2626"
            },
            
            // 4. (Optional) Override the text content
            applyText: "Warning: Low HP!",
            
            // 5. (Optional) Hide the element entirely? (true/false)
            hideElement: false
        },
        {
            targetTag: "rare_gem_icon",
            condition: function(ctx) {
                // Example: Check if the "Rarity" column equals "Legendary"
                const rarity = ctx.getCSVValue("characters.csv", "Rarity");
                return rarity.trim().toLowerCase() === "legendary";
            },
            // If it IS Legendary, make sure it is shown
            hideElement: false
        },
        {
            targetTag: "rare_gem_icon",
            condition: function(ctx) {
                // If it is NOT Legendary, hide it!
                const rarity = ctx.getCSVValue("characters.csv", "Rarity");
                return rarity.trim().toLowerCase() !== "legendary";
            },
            hideElement: true
        }
    ];
    // =========================================================================


    return {
        register: function() {
            return {
                name: "ConditionalStyles",
                description: "A rule-based engine to style, hide, or alter elements based on CSV data.",
                doc: "### Conditional Style Engine\n\nEdit this plugin's script to define custom rules in the `RULES` array at the top of the file.\n\n**Features:**\n* **`targetTag`**: Matches a Tag you apply to an item on your canvas.\n* **`condition`**: A function that returns `true` or `false` based on your data.\n* **`applyStyle`**: A standard CSS object (e.g., `{ backgroundColor: 'red', fontSize: '24px' }`).\n* **`applyText`**: Instantly swaps out the text content if the condition is met.\n* **`hideElement`**: Set to `true` to completely hide the element for this specific card.",
                minRecords: 0,
                varnames: [],
                images: []
            };
        },

        // The render hook fires every time the canvas updates or scrubs to a new row
        render: function(cardElement, context) {
            
            // Iterate through the user's custom rules
            RULES.forEach(rule => {
                
                let isMatch = false;
                
                // Safely evaluate the condition function
                if (typeof rule.condition === 'function') {
                    try {
                        isMatch = rule.condition(context);
                    } catch(e) {
                        console.warn(`[ConditionalStyles] Error evaluating rule for '${rule.targetTag}':`, e);
                    }
                } else {
                    // If no condition is provided, assume it always runs
                    isMatch = true;
                }

                // If the condition is met, apply the mutations
                if (isMatch && rule.targetTag) {
                    
                    // context.$() is our built-in helper that targets elements by their Tag
                    const $el = context.$(rule.targetTag);

                    // Apply CSS Styles
                    if (rule.applyStyle) {
                        for (let cssProp in rule.applyStyle) {
                            $el.css(cssProp, rule.applyStyle[cssProp]);
                        }
                    }

                    // Apply Text Override
                    if (rule.applyText !== undefined) {
                        $el.text(rule.applyText);
                    }

                    // Apply Visibility toggles safely using opacity!
                    if (rule.hideElement === true) {
                        $el.css('opacity', '0').css('pointer-events', 'none');
                    } else if (rule.hideElement === false) {
                        $el.css('opacity', '').css('pointer-events', '');
                    }
                }
                
            });
        }
    };
})();