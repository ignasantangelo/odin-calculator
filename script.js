let num1 = '';
let num2 = '';
let operation = '';
let updatingNumber1 = true;

const visor = document.getElementById('visor');
const allClear = document.getElementById('all-clear');
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
    a = parseInt(a);
    b = parseInt(b);
    switch(operator) {
        case '+': return add(a, b);
        case '-': return substract(a, b);
        case 'x': return multiply(a, b);
        case '÷': return divide(a, b);
        case '=': {
            num1 = '';
            num2 = '';
            operation = '';
            return a;
        };
        default: return 'Operation not allowed';
    }
}

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (updatingNumber1) {
            num1 += button.textContent;
            visor.textContent = num1;
        } else {
            num2 += button.textContent;
            visor.textContent = num2;
        }
    })
})

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (num1 === '') return; // ignore if no first number yet
        if (num2 !== '') {
            num1 = operate(num1, num2, operation).toString();
            num2 = '';
            visor.textContent = num1;
        }
        operation = button.textContent;
        updatingNumber1 = false;
    })
})

allClear.addEventListener('click', () => {
    num1 = '';
    num2 = '';
    operation = '';
    updatingNumber1 = true;
    visor.textContent = '';
})