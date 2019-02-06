function add(a,b){
    return a + b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

function operate(op,a,b){
    if(op === '+'){
        return add(a,b);
    }
    else if(op === '-'){
        return subtract(a,b);
    }
    else if(op === '*'){
        return multiply(a,b);
    }
    else if(op === '/'){
        return divide(a,b);
    }
    else{
        
    }
}

let input = '';
let display = document.querySelector('#display');
let buttons = document.querySelectorAll('button');
Array.from(buttons).forEach(button => {
    button.addEventListener('click',function(e){
        if(button.className === 'clr') {
            input = '';
        }
        else{
            input += button.className;
        }
        display.value = input;
    });
});
