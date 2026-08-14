// Quick Card Designer Plugin: Conditional Visibility
(function() {
    return {
        register: function() {
            return {
                name: "ConditionalVisibility",
                description: "Dynamically show/hide elements, fully supporting {{templates}} and combining with other tags.",
                doc: "### Conditional Visibility\n\nHide or show elements based on data for the current row. To use this, select an element or group, click the **Set Tags** icon in the floating toolbar, and append the following syntax to the end of the tags list:\n\n`show[<condition>]` or `hide[<condition>]`\n\n**Examples:**\n- `show[[HP] > 0]` -> Only visible if HP is greater than 0.\n- `autofit hide[[Class] === 'Mage']` -> You can combine tags! Just put the visibility tag at the end.\n- `show['{{Weapons.csv, Type}}' === 'Fire']` -> Fully supports your existing {{ }} templates (be sure to wrap them in quotes if checking text!).\n\nIf the condition fails for a `show` tag, the element is completely removed from the print layout for that specific card.",
                minRecords: 0
            };
        },
        
        // The render hook fires on every single card independently right before it is displayed or printed
        render: function(cardElement, context) {
            const root = cardElement || document;
            
            // Target elements using the new Tags system
            const elements = root.querySelectorAll('[data-tags]');
            
            elements.forEach(el => {
                const tags = el.getAttribute('data-tags');
                if (!tags) return;

                // Match show/hide at the END of the string so prefix tags like "autofit" are safely ignored
                const match = tags.trim().match(/(show|hide)\[(.*)\]$/i);
                if (match) {
                    const action = match[1].toLowerCase();
                    let condition = match[2];

                    // 1. Pre-process any native {{Template}} syntax using the core engine
                    // This allows things like: show['{{Target.csv, Column}}' === 'Yes']
                    let resolvedCondition = window.renderTemplateString(condition, context.rowIndex);

                    // 2. Replace legacy [ColumnName] syntax with actual row data, automatically JSON stringified for JS safety
                    let parsedCondition = resolvedCondition.replace(/\[([^\]]+)\]/g, (m, varName) => {
                        let val = window.renderTemplateString("{{" + varName.trim() + "}}", context.rowIndex);
                        if (val === "{{" + varName.trim() + "}}") val = "";
                        return JSON.stringify(val);
                    });

                    let isTrue = false;
                    try {
                        // Safely evaluate the final condition as a JavaScript expression
                        isTrue = new Function('return !!(' + parsedCondition + ')')();
                    } catch (e) {
                        console.warn("Visibility Plugin: Failed to evaluate condition -> " + parsedCondition, e);
                        isTrue = false;
                    }

                    // Determine final visibility
                    const shouldShow = (action === 'show') ? isTrue : !isTrue;

                    if (!shouldShow) {
                        el.style.opacity = '0';
                    } else {
                        el.style.opacity = ''; // Restore default display
                    }
                }
            });
        }
    };
})();