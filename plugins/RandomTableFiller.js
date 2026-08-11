// Quick Card Designer Plugin
// This script runs in the browser and provides dynamic variables/images.
(function() {
    return {
        // Register the plugin's name, docs, and available template variables/images
        register: function() {
            return {
                name: "RandomTableFiller",
                description: "Fills a designated table with random A-Z and 0-9 characters.",
                doc: "### Random Alphanumeric Table Filler\n\nThis plugin searches the card for a table with the Custom Name `random_alphanum` and fills every cell with a single, randomly generated alphanumeric character.\n\n**How to use:**\n1. Add a Table to your canvas.\n2. Select the table and click the **Set Element ID** (Tag) icon in the floating toolbar.\n3. Type `random_alphanum` into the input box.\n4. Ensure this plugin is loaded and active.",
                minRecords: 0, // Enforce a minimum number of records to generate (e.g. 54)
                
                // OPTIONAL: Declare variables and images to expose in the UI
                varnames: [],
                images: []
            };
        },
        
        // OPTIONAL: Manipulate the entire card DOM easily using the chainable API!
        render: function(cardElement, context) {
            const root = cardElement || document;
            const container = root.querySelector('[data-custom-name="random_alphanum"]');
            if (!container) return;

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
        }
    };
})();