const NUM_BTNS = Array.from(document.getElementsByClassName('num-btn'));
const OPERATOR_BTNS = Array.from(document.getElementsByClassName('operator-btn'));
const BTNS = Array.from(document.getElementsByClassName('btn'));
const DISPLAY_SCREEN = document.getElementById('display-value');
const CALC_SCREEN = document.getElementById('calculation-screen');
let displayValue = '';
let storedNum = '';

let liveOperator = '';
let firstVal = '';
let secondVal = '';
let startingVal = '';
let ticker = 1;

BTNS.forEach(btn => btn.addEventListener('click', e => {
    if (ticker === 1) {
      if ((e.target.value >= 0) && (e.target.value <=9)) {
        firstVal = '';
        secondVal = '';
        startingVal += e.target.value;
        DISPLAY_SCREEN.innerText = startingVal;
        return;
      }
      if ((e.target.value === '+') || (e.target.value === '-') || 
      (e.target.value === 'x') || (e.target.value === '/')) {
        if (Number.isInteger(firstVal)) {
          liveOperator = e.target.value;
          ticker = 2;
          CALC_SCREEN.innerText = firstVal + liveOperator;
          return;
        }
        if (!Number.isInteger(firstVal)) {
          liveOperator = e.target.value;
          firstVal = startingVal;
          startingVal = '';
          ticker = 2;
          CALC_SCREEN.innerText = firstVal + liveOperator;
          return;
        }
      }
      if (e.target.value === '=') {
        firstVal = operate(parseInt(firstVal), liveOperator, parseInt(secondVal));
        return;
      }
    }

    if (ticker === 2) {
      if ((e.target.value >= 0) && (e.target.value <=9)) {
        secondVal += e.target.value;
        DISPLAY_SCREEN.innerText = firstVal;
        CALC_SCREEN.innerText = firstVal + liveOperator + secondVal;
        return;
      }
      if ((e.target.value === '+') || (e.target.value === '-') || 
      (e.target.value === 'x') || (e.target.value === '/')) {
        if (parseInt(secondVal) !== NaN) {
          firstVal = operate(parseInt(firstVal), liveOperator, parseInt(secondVal));
          liveOperator = e.target.value;
          CALC_SCREEN.innerText = firstVal + liveOperator;
          DISPLAY_SCREEN.innerText = firstVal;
          secondVal = '';
          return;
        }
        if (parseInt(secondVal) === NaN) {
          return;
        }
      }
      if (e.target.value === '=') {
        firstVal = operate(parseInt(firstVal), liveOperator, parseInt(secondVal));
        ticker = 1;
        secondVal = '';
        DISPLAY_SCREEN.innerText = firstVal;
        CALC_SCREEN.innerText = firstVal;
        return;

      }
    } console.log(ticker);
}))



/* NUM_BTNS.forEach(btn => btn.addEventListener('click', e => {
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

*/






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