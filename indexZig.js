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
    let currentRow = 0;
    let currentCol = 0;
    let direction = 1; 

    flashingInterval = setInterval(() => {
        
        document.querySelectorAll('.bulb').forEach(bulb => {
            bulb.style.boxShadow = ''; 
            bulb.style.backgroundColor = 'white'; 
        }); 

        
        const row = rows[currentRow];
        const bulb = row.children[currentCol];
        if (bulb) {
            bulb.style.boxShadow = `0 0 20px ${color}`; 
            bulb.style.backgroundColor = color; 
        }

        
        currentCol += direction;

        
        if (currentCol < 0 || currentCol >= row.children.length) {
            direction *= -1; 
            currentCol += direction; 
            currentRow++;

            if (currentRow >= rows.length) {
                currentRow = 0; 
                direction = 1; 
            }
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
