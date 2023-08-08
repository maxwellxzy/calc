let runningTotal = 0;
let buffer = "0";
let previousOperator;
const screen = document.querySelector('.screen');
const debug = document.querySelector('.debug');

function buttonClick(value){
    if(isNaN(value)){
        if(value === '.')
        {
            handleNumber(value);
        }else if(value === '='|| value === 'C' || value === '←'){
            handleSymbol(value);
            screen.innerText = buffer;
            debug.innerText = previousOperator;
          return; 
        }
        handleSymbol(value);
    }
    else{
        handleNumber(value);
    screen.innerText = buffer;
    }
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            runningTotal = 0;
            buffer = '0';
            break;
        case '←':

            if(buffer.length === 1)
                buffer = '0';
            else
                buffer = buffer.substring(0,buffer.length - 1 );
            break;
        case '=':
            if(previousOperator === null)   return;
            flushOperation(parseFloat(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '×':
        case '÷':
        case '+':
        case '-':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol){
    if(buffer === '0'){
        return;
    }
    
 //   const intBuffer = parseInt(buffer);
    const intBuffer = parseFloat(buffer);

    if(runningTotal === 0){
        runningTotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
 }


function flushOperation(intBuffer){

    if(previousOperator === '+'){
        runningTotal += intBuffer;
    }else if(previousOperator === '-'){
        runningTotal -= intBuffer;
    }else if(previousOperator === '×'){
        runningTotal *= intBuffer;
    }else if(previousOperator === '÷'){
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString){
    if(buffer === '0'){
        buffer = numberString;
    }else{
        buffer += numberString;
    }
}
function init(){
    document.querySelector('.calc-buttons').
    addEventListener('click',function(event){
        buttonClick(event.target.innerText);
    })
}

init();