let currentDisplay = '0';
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let shouldResetDisplay = false;

function updateDisplay() {
    document.getElementById('display').innerText = currentDisplay;
}

function clearDisplay() {
    currentDisplay = '0';
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteLast() {
    if (currentDisplay.length > 1) {
        currentDisplay = currentDisplay.slice(0, -1);
    } else {
        currentDisplay = '0';
    }
    updateDisplay();
}

function appendDigit(digit) {
    if (shouldResetDisplay) {
        currentDisplay = digit;
        shouldResetDisplay = false;
    } else {
        currentDisplay = currentDisplay === '0' ? digit : currentDisplay + digit;
    }
    updateDisplay();
}

function setOperator(operator) {
    if (currentOperator && secondOperand) {
        calculateResult();
    } else if (firstOperand === null) {
        firstOperand = parseFloat(currentDisplay);
    }
    currentOperator = operator;
    shouldResetDisplay = true;
}

function calculateResult() {
    if (firstOperand !== null && currentOperator !== null) {
        secondOperand = parseFloat(currentDisplay);
        let result = operate(currentOperator, firstOperand, secondOperand);
        currentDisplay = result.toString();
        if (currentDisplay.length > 10) {
            currentDisplay = result.toFixed(4);
        }
        firstOperand = result;
        secondOperand = null;
        currentOperator = null;
        shouldResetDisplay = true;
        updateDisplay();
    }
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b === 0) {
                clearDisplay();
                return '错误';
            } else {
                return a / b;
            }
        default:
            return b;
    }
}

document.addEventListener('keydown', function (event) {
    const key = event.key;
    if (!isNaN(key) || key === '.') {
        appendDigit(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        setOperator(key);
    } else if (key === 'Enter' || key === '=') {
        calculateResult();
    } else if (key === 'Escape' || key === 'c') {
        clearDisplay();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});

updateDisplay();
