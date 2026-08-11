// Quick Card Designer Plugin
// This script runs in the browser and provides dynamic variables/images.
(function() {
    return {
        // Register the plugin's name, docs, and available template variables/images
        register: function() {
            return {
                name: "RandomTableFiller",
                description: "Fills designated tables with random A-Z and 0-9 characters.",
                doc: "### Random Alphanumeric Table Filler\n\nThis plugin searches the card for any tables with the Custom Name `random_alphanum` and fills every cell with a single, randomly generated alphanumeric character.\n\n**How to use:**\n1. Add a Table to your canvas.\n2. Select the table and click the **Set Element ID** (Tag) icon in the floating toolbar.\n3. Type `random_alphanum` into the input box.\n4. Ensure this plugin is loaded and active.",
                minRecords: 0, 
                varnames: [],
                images: []
            };
        },
        
        render: function(cardElement, context) {
            const root = cardElement || document;
            
            const containers = root.querySelectorAll('[data-custom-name="random_alphanum"]');
            if (containers.length === 0) return;

            // Loop through every table that has the tag
            containers.forEach(container => {
                const table = container.tagName.toLowerCase() === 'table' 
                    ? container 
                    : container.querySelector('table');
                
                if (!table) return;

                const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                const cells = table.querySelectorAll('td, th');

                cells.forEach(cell => {
                    let cellText = cell.querySelector('.cell-text');

                    // Reconstruct the required structure if previous scripts wiped it out
                    if (!cellText) {
                        cell.removeAttribute('contenteditable');
                        cell.innerHTML = `
                            <div class="cell-content-layer">
                                <div class="cell-text" contenteditable="true" style="justify-content: center; align-items: center; text-align: center;"></div>
                            </div>
                        `;
                        cellText = cell.querySelector('.cell-text');
                    }

                    // Update text inside .cell-text to preserve contenteditable and inline font styles
                    cellText.textContent = chars.charAt(Math.floor(Math.random() * chars.length));
                });
            });
        }
    };
})();