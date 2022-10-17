const NUM_BTNS = Array.from(document.getElementsByClassName('num-btn'));
const OPERATOR_BTNS = Array.from(document.getElementsByClassName('operator-btn'));
const DISPLAY_SCREEN = document.getElementById('display-value');
const CALC_SCREEN = document.getElementById('calculation-screen');
let displayValue = '';
let secondValue = '';
let storedNum = '';
let liveOperator = '';


NUM_BTNS.forEach(btn => btn.addEventListener('click', e => {
    displayValue += e.target.value;
    DISPLAY_SCREEN.innerHTML = displayValue;
}))

OPERATOR_BTNS.forEach(btn => btn.addEventListener('click', e => {
    operator = e.target.value;
    if (operator !== '=') {
        storedNum = parseInt(displayValue);
        liveOperator = operator;
        displayValue = '';
        CALC_SCREEN.innerHTML = storedNum + ' ' + operator;
    }
    if (operator === '=') {
        displayValue = operate(storedNum, liveOperator, parseInt(displayValue));
        DISPLAY_SCREEN.innerHTML = displayValue;

    }
    console.log(storedNum);
    console.log(liveOperator);

}))


/* NUM_BTNS.forEach(btn => btn.addEventListener('click', e => {
    displayValue += e.target.value;
    DISPLAY_SCREEN.innerHTML = displayValue;
}))

OPERATOR_BTNS.forEach(btn => btn.addEventListener('click', e => {
    let operator = e.target.value;
    if (operator !== '=') {
        storedNum = parseInt(displayValue);
        CALC_SCREEN.innerHTML = storedNum + ' ' + operator;
    }
    else {
})) */






const add = function(numOne, numTwo) {
	return (numOne + numTwo);
};

const subtract = function(numOne, numTwo) {
	return (numOne - numTwo);
};

const divide = function(numOne, numTwo) {
	return (numOne / numTwo);
};

const sum = function(arr) {
	let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
};

const multiply = function(arr) {
  let sum = 1;
  for (let i = 0; i < arr.length; i++) {
    sum *= arr[i];
  }
  return sum;
};

const power = function(num, numTwo) {
	return num ** numTwo;
};

const factorial = function(num) {
	let sum = 1;
  for (let i = 1; i <= num; i++) {
    sum *= i;
  }
  return sum;
}

function operate(numOne, operator, numTwo) {
   if (operator === '+') return add(numOne, numTwo);
   if (operator === '-') return subtract(numOne, numTwo);
   if (operator === '/') return divide(numOne, numTwo);
   if ((operator === '*') || (operator === 'x')) return multiply([numOne, numTwo]);
}