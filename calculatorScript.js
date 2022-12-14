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
let tempSecondVal = '';
let ticker = 1;

document.addEventListener('keypress', e => {
  if (e.key === '0') document.getElementById('btn-zero').click();
  if (e.key === '1') document.getElementById('btn-one').click();
  if (e.key === '2') document.getElementById('btn-two').click();
  if (e.key === '3') document.getElementById('btn-three').click();
  if (e.key === '4') document.getElementById('btn-four').click();
  if (e.key === '5') document.getElementById('btn-five').click();
  if (e.key === '6') document.getElementById('btn-six').click();
  if (e.key === '7') document.getElementById('btn-seven').click();
  if (e.key === '8') document.getElementById('btn-eight').click();
  if (e.key === '9') document.getElementById('btn-nine').click();
  if (e.key === '.') document.getElementById('btn-float').click();
  if (e.key === '+') document.getElementById('btn-plus').click();
  if (e.key === '-') document.getElementById('btn-subtract').click();
  if (e.key === '/') document.getElementById('btn-divide').click();
  if ((e.key === 'x') || (e.key === '*')) document.getElementById('btn-multiply').click();
  if ((e.key === '=') || (e.key === 'Enter')) document.getElementById('btn-equals').click();
  if (e.key === 'Delete') document.getElementById('btn-delete').click();
  if ((e.key === 'c') || (e.key === 'C')) document.getElementById('btn-clear').click();
  else console.log(e.key)
});

BTNS.forEach(btn => btn.addEventListener('click', e => {
    if (e.target.value === 'clear') {
      liveOperator = '';
      liveOperator = '';
      firstVal = '';
      secondVal = '';
      startingVal = '';
      tempSecondVal = '';
      ticker = 1;
      CALC_SCREEN.innerText = '';
      DISPLAY_SCREEN.innerText = '';
      return;
    }
  
    if (ticker === 1) {
      if (e.target.value === 'delete') {
        if (typeof firstVal === 'number') {
          if ((firstVal >= 10) || (firstVal <= -10)) {
          firstVal = firstVal.toString();
          firstVal = firstVal.slice(0, firstVal.length - 1);
          firstVal = parseFloat(firstVal);
          CALC_SCREEN.innerText = firstVal
          return;
          }
          else {
            firstVal = 0;
                      CALC_SCREEN.innerText = firstVal
          return;
          }
        }
        else {
          startingVal = startingVal.slice(0, startingVal.length - 1);
          DISPLAY_SCREEN.innerText = startingVal;
          return;
        }
      }
      if (((e.target.value >= 0) && (e.target.value <=9)) || (e.target.value === '.')) {
        if (startingVal.length === 17) return;
        if (e.target.value === '.') {
          if ((startingVal.search(/[.]/)) > -1) return;
        }
        firstVal = '';
        secondVal = '';
        startingVal += e.target.value;
        DISPLAY_SCREEN.innerText = startingVal;
        return;
      }
      if ((e.target.value === '+') || (e.target.value === '-') || 
      (e.target.value === 'x') || (e.target.value === '/')) {
        if ((typeof firstVal) === 'number') {
          liveOperator = e.target.value;
          ticker = 2;
          CALC_SCREEN.innerText = firstVal + liveOperator;
          return;
        }
        if ((typeof firstVal) !== 'number')  {
          if (startingVal !== '') {
            liveOperator = e.target.value;
            firstVal = startingVal;
            startingVal = '';
            ticker = 2;
            CALC_SCREEN.innerText = firstVal + liveOperator;
            return;
          }
          else return;
        }
      }
    }
////////////////STATE 2 BELOW///////////////////////////////////////////////////////
    if (ticker === 2) {
      if (e.target.value === 'delete') {
        if (secondVal.length > 0) {
        secondVal = secondVal.slice(0, secondVal.length - 1)
        DISPLAY_SCREEN.innerText = firstVal;
        CALC_SCREEN.innerText = firstVal + liveOperator + secondVal;
        return;
        }
        if (secondVal === '') {
          liveOperator = '';
          DISPLAY_SCREEN.innerText = firstVal;
          CALC_SCREEN.innerText = firstVal;
          ticker = 1;
          firstVal = parseFloat(firstVal);
          return;
        }
      }
      if (((e.target.value >= 0) && (e.target.value <=9)) || (e.target.value === '.')) {
        if (secondVal.length === 17) return;
        if (e.target.value === '.') {
          if ((secondVal.search(/[.]/)) > -1) return;
        }
        secondVal += e.target.value;
        DISPLAY_SCREEN.innerText = firstVal;
        CALC_SCREEN.innerText = firstVal + liveOperator + secondVal;
        return;
      }
      if ((e.target.value === '+') || (e.target.value === '-') || 
      (e.target.value === 'x') || (e.target.value === '/')) {
        if (secondVal === '') {
          if (liveOperator === e.target.value) {
          liveOperator = e.target.value;
          CALC_SCREEN.innerText = firstVal + liveOperator;
          return;
          }
          else {
            liveOperator = e.target.value;
            CALC_SCREEN.innerText = firstVal + liveOperator;
            DISPLAY_SCREEN.innerText = firstVal;
            return;
          }
        
        }
        if (parseInt(secondVal) !== NaN) {
          if (typeof secondVal === 'string') {
            firstVal = operate(firstVal, liveOperator, secondVal);
            liveOperator = e.target.value;
            secondVal = '';
            CALC_SCREEN.innerText = firstVal + liveOperator;
            DISPLAY_SCREEN.innerText = firstVal;
            secondVal = '';
            return;
          }
          else return;
        }
        if (parseInt(secondVal) === NaN) {
          return;
        }
      }
      if (e.target.value === '=') {
        if (((liveOperator === '+') || (liveOperator === '-') || 
        (liveOperator === 'x') || (liveOperator === '/')) && (secondVal === '')){
          return;
        }
        if (secondVal !== '') {
        firstVal = operate(firstVal, liveOperator, secondVal);
        ticker = 1;
        secondVal = '';
        DISPLAY_SCREEN.innerText = firstVal;
        CALC_SCREEN.innerText = firstVal;
        return;
        }
        else {
          firstVal = operate(firstVal, liveOperator, tempSecondVal);
          CALC_SCREEN.innerText = firstVal + liveOperator + tempSecondVal;
          DISPLAY_SCREEN.innerText = firstVal;
          ticker = 1;
          return;
        }

      }
    } 
    console.log(ticker);
}))


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
   let firstNum = parseFloat(numOne);
   let secondNum = parseFloat(numTwo);

   if (operator === '+') return add(firstNum, secondNum);
   if (operator === '-') return subtract(firstNum, secondNum);
   if (operator === '/') return divide(firstNum, secondNum);
   if ((operator === '*') || (operator === 'x')) return multiply([firstNum, secondNum]);
}