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
}

let arr = [];

function getNumbers(){
    arr = [];
    let num = '';
    let isFloat2 = false;;
    for(a = 0;a < input.length;a++){
        if(input.charAt(a) == '*'||input.charAt(a) === '+'||input.charAt(a) === '/'||input.charAt(a) === '-'||input.charAt(a) === '='){
            let obj = {};
            if(isFloat2) {
                obj.num = parseFloat(num);
            }
            else {
                obj.num = parseInt(num);
            }
            obj.op = input.charAt(a);
            arr.push(obj);
            num = '';
            isFloat2 = false;
        }
        else if(input.charAt(a) === '.'){
            num += '.';
            isFloat2 = true;
        }
        else{
            num += input.charAt(a);
        }
    }
}

function calculate(){
    let a;
    for(a = 0;a < arr.length - 1;a++){
        if(arr[a].op === '*' || arr[a].op === '/'){
            arr[a+1].num = operate(arr[a].op,arr[a].num,arr[a+1].num);
            arr.splice(a,1);
            a--;
        }
    }
    for(a = 0;a < arr.length - 1;a++){
        arr[a+1].num = operate(arr[a].op,arr[a].num,arr[a+1].num);
        arr.splice(a,1);
        a--;
    }
    return Math.round(arr[a].num * 100)/100;
}

let opBool = false;
let input = '';
let display = document.querySelector('#display');
let buttons = document.querySelectorAll('.col button');
Array.from(buttons).forEach(button => {
    button.addEventListener('click',function(e){
        if(button.id === 'op'){
            if(opBool && arr.length === 0){
                    return;
            }
            opBool = true;
            input += button.className;
        }
        else if(button.className === 'clr') {
            opBool = false;
            input = '';
            arr =[];
        }
        else if(button.className === '.'){
            for(a = input.length-1;a >= 0;a--){
                if(input.charAt(a) == '*'||input.charAt(a) === '+'||input.charAt(a) === '/'||input.charAt(a) === '-'||input.charAt(a) === '='){
                    break;
                }
                if(input.charAt(a) === '.'){
                    return;
                }
            }
            input += button.className;
        }
        else if(button.className === 'backspace'){
            if(input === '') return;
            input = input.substr(0,input.length-1);
        }
        else if(button.className === '='){
            if(opBool){
                return;
            }
            input += '=';
            getNumbers();
            opBool = true;
            input = calculate().toString();
        }
        else{
            opBool = false;
            input += button.className;
        } 
        display.innerHTML = input;
    });
});

//window.addEventListener('keydown')