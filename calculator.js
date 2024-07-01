const output = document.getElementById('output');
let num1 = 0;
let first = true; // if first operand
let operation = ''; // +, -, /, *, %, 

/*
  s-operation : sigle operand operation
  d-operation:  dual  operand operation

  e-control : editing control
  m-control : memory control

  number:
*/

function isNumeric(num) {
    return !isNaN(num)
}

function toNumber(value) {
    if (isNumeric(value))
        return +value;
    else
        return false;
}

/**
 * 
 * @param {value to display - Number / String} value 
 */
function setOutput(value) {
    output.innerText = ('' + value).slice(0, 13);
}

/**
 * 
 * @param {value to display - Number / String} value 
 */
function appendOutput(value) {
    if (output.innerText.length < 13) {
        if ((output.innerText.length == 1) && (output.innerText === '0'))
            setOutput(value);
        else
            output.innerText += value;
    }
}

function displayResult(result, oper) {
    setOutput(result);
    operation = oper;
    first = false;
    num1 = result;
}

function backspace() {
    if (output.innerText.length == 1)
        output.innerText = '0';
    else
        output.innerText = output.innerText.slice(0, -1)
}

function clear() {
    setOutput('0');
    state = 'number';
    num1 = 0;
    first = true; // if first operand
    operation = '';
}

/**
 * @param {which operation to perform - String} operation 
 * @param {value 1 - Number} value_1 
 * @param {value 2 - Number} value_2 
 */
function process(operation, value_1, value_2) {
    let result = value_1;
    switch (operation) {
        case '+':
            result += value_2;
            break;
        case '*':
            result *= value_2;
            break;
        case '/':
            result /= value_2;
            break;
        case '-':
            result -= value_2;
            break;
        case '%':
            result %= value_2;
            break;
        case 'sqrt':
            result = Math.sqrt(value_1);
            break;
        case '1/x':
            result = 1 / value_1;
            break;
        case '+-':
            result = -1 * value_1;
            break;
    }
    return result;
}

function processEditControl(value) {
    switch (value) {
        case 'c':
        case 'ce':
            clear();
            break;
        case 'bs':
            backspace();
            break;
    }
}

function processNumber(operation, value) {
    if (operation !== '')
        setOutput(value);
    else
        appendOutput(value);
}

function processDualOperator(first, temp, value, num1, operation) {
    if (first) {
        displayResult(temp, value);
    } else {
        let result = process(operation, num1, temp);
        displayResult(result, value);
    }
}

function processSingleOperator(value, temp, num1, operation) {
    let result = 0;

    if ((value === '=') && (operation != '=')) {
        result = process(operation, num1, temp);
        displayResult(result, '=');
        return;
    }

    if ((value === 'sqrt') || (value === '1/x')) {
        result = process(value, temp);
        displayResult(result, '');
    }
}

const buttonGroupPressed = (e) => {
    let temp = toNumber(output.innerText);
    const element = e.target;
    const action = element.getAttribute('action');
    const value = element.getAttribute('value');

    switch (action) {
        case 'e-control': // editing control operation
            processEditControl(value);
            break;
        case 'number':
            processNumber(operation, value);
            break;
        case 's-operator':
            processSingleOperator(value, temp, num1, operation);
            break;
        case 'd-operator': // single operand operation
            processDualOperator(first, temp, value, num1, operation);
            break;
        case 'm-control':
            break;
    }
}

const buttonGroup = document.getElementById("buttonGroup");
buttonGroup.addEventListener('click', buttonGroupPressed);