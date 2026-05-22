let num1 = '';
let num2 = '';
let operation = '';
let updatingNumber1 = true;
let isDotAdded = false;

const visor = document.getElementById('visor');
const numberButtons = document.querySelectorAll('.button.number');
const operatorButtons = document.querySelectorAll('.button.operator');

const key1 = document.getElementById('num1');
const key2 = document.getElementById('num2');
const key3 = document.getElementById('num3');
const key4 = document.getElementById('num4');
const key5 = document.getElementById('num5');
const key6 = document.getElementById('num6');
const key7 = document.getElementById('num7');
const key8 = document.getElementById('num8');
const key9 = document.getElementById('num9');
const key0 = document.getElementById('num0');
const allClear = document.getElementById('all-clear');
const dot = document.getElementById('dot');
const backspace = document.getElementById('backspace');
const equals = document.getElementById('equals');
const keyDivide = document.getElementById('divide');
const keySubtract = document.getElementById('subtract');
const keyMultiply = document.getElementById('multiply');
const keyAdd = document.getElementById('add');


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

document.addEventListener('keydown', (event) => {
    const isEnter = event.code === 'Enter' || event.code === 'NumpadEnter';
    if (isEnter) event.preventDefault();

    const press = (el) => {
        if (!el) return;
        el.classList.add('is-active');
        el.click();
        el.blur(); // removes focus on element
        setTimeout(() => el.classList.remove('is-active'), 100);
    };

    switch (event.code) {
        case 'Digit1': case 'Numpad1': press(key1); break;
        case 'Digit2': case 'Numpad2': press(key2); break;
        case 'Digit3': case 'Numpad3': press(key3); break;
        case 'Digit4': case 'Numpad4': press(key4); break;
        case 'Digit5': case 'Numpad5': press(key5); break;
        case 'Digit6': case 'Numpad6': press(key6); break;
        case 'Digit7': case 'Numpad7': press(key7); break;
        case 'Digit8': case 'Numpad8': press(key8); break;
        case 'Digit9': case 'Numpad9': press(key9); break;
        case 'Digit0': case 'Numpad0': press(key0); break;

        case 'Slash': case 'NumpadDivide': press(keyDivide); break;
        case 'NumpadMultiply': press(keyMultiply); break;
        case 'Minus': case 'NumpadSubtract': press(keySubtract); break; 
        case 'NumpadAdd': press(keyAdd); break;

        case 'Enter': case 'NumpadEnter': press(equals); break;
        case 'Period': case 'NumpadDecimal': press(dot); break;
        case 'Backspace': press(backspace); break;
        case 'Escape': press(allClear); break;
    }
});