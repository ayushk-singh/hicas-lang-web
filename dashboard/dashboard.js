function handleSelection() {
    const subject = document.getElementById("subject-dropdown").value;
    const dept = document.getElementById("dept-dropdown").value;
    const sheet = document.getElementById("sheet-dropdown").value;

    // Proceed only if all three selections are made
    if (subject && dept && sheet) {
        const csvFilePath = `csv_files/${subject}_${dept}_${sheet}.csv`;
        loadCSV(csvFilePath);
    }
}

function loadCSV(csvFilePath) {
    Papa.parse(csvFilePath, {
        download: true,
        header: false,
        complete: function(results) {
            renderCSVTable(results.data);
        },
        error: function(error) {
            document.getElementById("csv-table-container").innerHTML = `<p>Error loading CSV file: ${error.message}</p>`;
        }
    });
}

function renderCSVTable(csvData) {
    const container = document.getElementById("csv-table-container");
    
    // Clear previous table content
    container.innerHTML = "";

    // Create table element
    const table = document.createElement("table");

    // Add rows to the table
    csvData.forEach((row, index) => {
        const tr = document.createElement("tr");

        // Use first row for table headers
        if (index === 0) {
            row.forEach(cell => {
                const th = document.createElement("th");
                th.textContent = cell;
                tr.appendChild(th);
            });
        } else {
            row.forEach(cell => {
                const td = document.createElement("td");
                td.textContent = cell;
                tr.appendChild(td);
            });
        }
        table.appendChild(tr);
    });

    // Append the table to the container
    container.appendChild(table);
}