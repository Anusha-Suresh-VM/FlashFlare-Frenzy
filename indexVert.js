let flashingInterval = null;

function drawPyramid(color) {
    const rows = parseInt(document.getElementById('rows').value);
    const output = document.getElementById('output');

    output.innerHTML = ''; 

    for (let i = 1; i <= rows; i++) {
        const row = document.createElement('div');
        row.className = 'row';

        for (let j = 0; j < i; j++) {
            const bulb = document.createElement('div');
            bulb.className = 'bulb';
            bulb.style.backgroundColor = "white"; 
            bulb.style.margin = "10px";
            row.appendChild(bulb);
        }

        output.appendChild(row);
    }
}

function flashBulb() {
    stopFlashing(); 

    const color = document.getElementById('color').value;
    drawPyramid(color); 

    const rows = document.querySelectorAll('.row');
    const maxColumns = rows[rows.length - 1].children.length; 
    let columnIndex = 0;
    let bulbIndex = 0;

   
    const columns = Array.from({ length: maxColumns }, (_, i) => {
        return Array.from(rows).map(row => row.children[i]).filter(Boolean);
    });

    flashingInterval = setInterval(() => {
        
        document.querySelectorAll('.bulb').forEach(bulb => {
            bulb.style.boxShadow = ''; 
            bulb.style.backgroundColor = 'white'; 
        }); 

        
        if (columns[columnIndex]) {
            if (columns[columnIndex][bulbIndex]) {
                columns[columnIndex][bulbIndex].style.boxShadow = `0 0 20px ${color}`; 
                columns[columnIndex][bulbIndex].style.backgroundColor = color; 
            }
        }

        
        bulbIndex++;
        if (bulbIndex >= columns[columnIndex].length) {
            bulbIndex = 0; 
            columnIndex = (columnIndex + 1) % columns.length; 
        }
    }, 500); 
}

function stopFlashing() {
    if (flashingInterval !== null) {
        clearInterval(flashingInterval);
        flashingInterval = null;
    }

    document.querySelectorAll('.bulb').forEach(bulb => {
        bulb.style.boxShadow = ''; 
    });
}
