let isMatrixMode = false;

function clearDisplay() {
    document.getElementById('display').value = '';
    if (isMatrixMode) {
        toggleMatrixMode();
    }
}

function appendToDisplay(value) {
    const display = document.getElementById('display');
    display.value += value;
}

function calculate() {
    const display = document.getElementById('display');
    let expression = display.value;
    try {
        expression = expression.replace(/π/g, Math.PI)
                               .replace(/exp/g, 'Math.exp')
                               .replace(/sqrt/g, 'Math.sqrt')
                               .replace(/log/g, 'Math.log10')
                               .replace(/ln/g, 'Math.log')
                               .replace(/sin/g, 'Math.sin')
                               .replace(/cos/g, 'Math.cos')
                               .replace(/tan/g, 'Math.tan')
                               .replace(/asin/g, 'Math.asin')
                               .replace(/acos/g, 'Math.acos')
                               .replace(/atan/g, 'Math.atan')
                               .replace(/gcd/g, 'gcd')
                               .replace(/lcm/g, 'lcm')
                               .replace(/inv/g, 'inv');

        const result = eval(expression);
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}

function toggleMatrixMode() {
    const matrixDisplay = document.getElementById('matrixDisplay');
    isMatrixMode = !isMatrixMode;
    matrixDisplay.classList.toggle('hidden');
    if (isMatrixMode) {
        createMatrix();
        document.querySelector('.numeric-pad').classList.add('hidden');
        document.querySelector('.functions').classList.add('hidden');
    } else {
        document.querySelector('.numeric-pad').classList.remove('hidden');
        document.querySelector('.functions').classList.remove('hidden');
    }
}

function createMatrix() {
    const matrixDisplay = document.getElementById('matrixDisplay');
    matrixDisplay.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const row = document.createElement('div');
        row.className = 'matrix-row';
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('input');
            cell.type = 'text';
            cell.className = 'matrix-cell';
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('keydown', handleMatrixKeydown);
            row.appendChild(cell);
        }
        matrixDisplay.appendChild(row);
    }
}

function handleMatrixKeydown(event) {
    const key = event.key;
    const cell = event.target;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    if (key === 'ArrowUp' && row > 0) {
        cell.blur();
        document.querySelector(`.matrix-cell[data-row="${row - 1}"][data-col="${col}"]`).focus();
    } else if (key === 'ArrowDown' && row < 2) {
        cell.blur();
        document.querySelector(`.matrix-cell[data-row="${row + 1}"][data-col="${col}"]`).focus();
    } else if (key === 'ArrowLeft' && col > 0) {
        cell.blur();
        document.querySelector(`.matrix-cell[data-row="${row}"][data-col="${col - 1}"]`).focus();
    } else if (key === 'ArrowRight' && col < 2) {
        cell.blur();
        document.querySelector(`.matrix-cell[data-row="${row}"][data-col="${col + 1}"]`).focus();
    }
}

function matrix() {
    const matrixCells = document.querySelectorAll('.matrix-cell');
    const matrix = [];
    for (let i = 0; i < 3; i++) {
        const row = [];
        for (let j = 0; j < 3; j++) {
            row.push(parseFloat(matrixCells[i * 3 + j].value) || 0);
        }
        matrix.push(row);
    }
    return matrix;
}

function inv() {
    return 'Inverse Functionality';
}

document.addEventListener('keydown', function(e) {
    const key = e.key;
    if ((key >= '0' && key <= '9') || ['+', '-', '*', '/', '(', ')', '.', 'Enter'].includes(key)) {
        if (key === 'Enter') {
            calculate();
        } else {
            appendToDisplay(key);
        }
    } else if (key === 'Backspace') {
        document.getElementById('display').value = document.getElementById('display').value.slice(0, -1);
    } else if (key === 'm') {
        toggleMatrixMode();
    }
});
