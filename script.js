let num1 = '';
let num2 = '';
let operation = '';
let updatingNumber1 = true;
let isDotAdded = false;

const visor = document.getElementById('visor');
const allClear = document.getElementById('all-clear');
const dot = document.getElementById('dot');
const backspace = document.getElementById('backspace');
const numberButtons = document.querySelectorAll('.button.number');
const operatorButtons = document.querySelectorAll('.button.operator');

function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch(operator) {
        case '+': return add(a, b);
        case '-': return substract(a, b);
        case 'x': return multiply(a, b);
        case '÷': {
            if (b === 0) return '#DIV/0!';
            else return divide(a, b);
        };
        case '=': return a;
        default: return 'Operation not allowed';
    }
}

function createNumberHandler(button) {
    return function handleNumberButton() {
        if (updatingNumber1) {
            num1 += button.textContent;
            visor.textContent = num1;
        } else {
            if (operation === '=') {
                num1 = button.textContent;
                visor.textContent = num1;
                updatingNumber1 = true;
            } else {
                num2 += button.textContent;
                visor.textContent = num2;
            }
        }
    }
}

function createOperatorHandler(button) {
    return function handleOperatorButton() {
        if (num1 === '') return; // ignore if no first number yet
        if (num2 !== '') {
            if (num1 === '#DIV/0!') {
                num1 = '';
                updatingNumber1 = true;
                return; // ignore if the previous result was an error
            }
            num1 = operate(num1, num2, operation).toString();
            num2 = '';
            visor.textContent = num1;
        }
        operation = button.textContent;
        updatingNumber1 = false;
    }
}

function handleAllClear() {
    num1 = '';
    num2 = '';
    operation = '';
    updatingNumber1 = true;
    visor.textContent = '';
}

function handleDot() {
    if (updatingNumber1) {
        if (num1.includes('.')) return; // ignore if the number already has a decimal
        if (num1 === '') {
            num1 = '0.';
            visor.textContent = num1;
            return;
        }
        num1 += '.';
        visor.textContent = num1;
    } else {
        if (num2.includes('.')) return; // ignore if the number already has a decimal
        if (num2 === '') {
            num2 = '0.';
            visor.textContent = num2;
            return;
        }
        num2 += '.';
        visor.textContent = num2;
    }
}

function handleBackspace() {
    if (updatingNumber1) {
        num1 = num1.slice(0, -1);
        visor.textContent = num1;
    } else {
        num2 = num2.slice(0, -1);
        visor.textContent = num2;
    }
}

numberButtons.forEach(button => {
    button.addEventListener('click', createNumberHandler(button));
});
operatorButtons.forEach(button => {
    button.addEventListener('click', createOperatorHandler(button))
});
allClear.addEventListener('click', handleAllClear);
dot.addEventListener('click', handleDot);
backspace.addEventListener('click', handleBackspace);