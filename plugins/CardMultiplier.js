// Quick Card Designer Plugin: Card Multiplier
// Automatically duplicates cards based on a 'Quantity' or 'Qty' column in your CSV.
(function() {
    return {
        register: function() {
            return {
                name: "CardMultiplier",
                description: "Reads a 'Quantity' column in your CSV and automatically duplicates rows for printing.",
                doc: "### Card Multiplier (Quantity Engine)\n\nPerfect for TCG and board game designers! Instead of manually copy/pasting rows in your spreadsheet to print multiple copies of a card, this plugin does it for you in memory.\n\n**How to use:**\n1. Ensure your CSV has a column named **Quantity**, **Qty**, or **Count**.\n2. Put a number in that column (e.g., `3`).\n3. The app will now treat your CSV as if that row exists 3 times, generating 3 identical cards in the Data Cluster and Export Engine.\n\n*(Note: If a cell is blank or invalid, it defaults to 1 copy. If you put 0, the card is skipped entirely!)*",
                minRecords: 0,
                varnames: [],
                images: []
            };
        },
        
        // Intercept and mutate the CSV data globally
        processData: function(dataSources) {
            // Loop through all loaded data sources
            for (let key in dataSources) {
                const src = dataSources[key];
                
                // We need headers to find the Quantity column
                if (!src.hasHeader || !src.data || src.data.length === 0) continue;

                // Look for common quantity column names (case-insensitive)
                const headers = src.data[0].map(h => String(h).trim().toLowerCase());
                let qtyIndex = headers.indexOf("quantity");
                if (qtyIndex === -1) qtyIndex = headers.indexOf("qty");
                if (qtyIndex === -1) qtyIndex = headers.indexOf("count");

                // If a quantity column exists, rebuild the data array
                if (qtyIndex !== -1) {
                    const newData = [src.data[0]]; // Keep the header row
                    const newExcluded = {}; // Track user UI exclusions mapping
                    let newPhysicalRowIndex = 1;

                    for (let i = 1; i < src.data.length; i++) {
                        const row = src.data[i];
                        const isExcluded = src.excludedRows && src.excludedRows[i];
                        
                        // If the user manually unchecked this row in the UI, keep it excluded and don't duplicate it
                        if (isExcluded) {
                            newData.push(row);
                            newExcluded[newPhysicalRowIndex] = true;
                            newPhysicalRowIndex++;
                            continue;
                        }

                        // Parse the quantity (default to 1 if empty/invalid)
                        let qty = parseInt(row[qtyIndex], 10);
                        if (isNaN(qty)) qty = 1; 

                        // Clone the row 'qty' times into the new dataset
                        for (let q = 0; q < qty; q++) {
                            newData.push(row); // We can push the same array reference safely
                            newPhysicalRowIndex++;
                        }
                    }
                    
                    // Replace the original data with our expanded deck
                    src.data = newData;
                    src.excludedRows = newExcluded;
                }
            }
            return dataSources; 
        }
    };
})();