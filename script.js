let currentDisplay = '0';
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let shouldResetDisplay = false;

// 更新显示面板上的当前显示值
function updateDisplay() {
    document.getElementById('display').innerText = currentDisplay;
}

// 清除显示面板并重置所有操作数和操作符
function clearDisplay() {
    currentDisplay = '0';
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

// 删除当前显示值的最后一位数字
function deleteLast() {
    if (currentDisplay.length > 1) {
        currentDisplay = currentDisplay.slice(0, -1);
    } else {
        currentDisplay = '0';
    }
    updateDisplay();
}

// 将输入的数字附加到当前显示值上
function appendDigit(digit) {
    if (shouldResetDisplay) {
        currentDisplay = digit;
        shouldResetDisplay = false;
    } else {
        currentDisplay = currentDisplay === '0' ? digit : currentDisplay + digit;
    }
    updateDisplay();
}

// 设置当前的操作符，并根据需要计算结果
function setOperator(operator) {
    if (currentOperator && secondOperand) {
        calculateResult();
    } else if (firstOperand === null) {
        firstOperand = parseFloat(currentDisplay);
    }
    currentOperator = operator;
    shouldResetDisplay = true;
}

// 计算当前操作数和操作符的结果，并更新显示值
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

// 根据操作符对两个操作数进行运算
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

// 监听键盘事件，根据按键执行相应的操作
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

// 初始化显示面板
updateDisplay();
