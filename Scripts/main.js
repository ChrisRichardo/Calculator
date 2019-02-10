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
let calculated = false;
let input = '';
let result = document.querySelector('#result');
let display = document.querySelector('#display');
let buttons = document.querySelectorAll('.col button');
Array.from(buttons).forEach(button => {
    button.addEventListener('click',function(e){
        if(button.id === 'op'){
            if(calculated){
                input = result.innerHTML;
                result.innerHTML = '';
                calculated = false;
            }
            if(input.length === 0) return;
            if(input.charAt(input.length-1) === '.' || input.charAt(input.length-1) === '-' || input.charAt(input.length-1) === '+' || input.charAt(input.length-1) === '*' || input.charAt(input.length-1) === '/'){
                return;
            }
            input += button.className;
        }
        else if(button.className === 'clr') {
            if(calculated){
                result.innerHTML = '';
                calculated = false;
            }
            input = '';
            arr =[];
        }
        else if(button.className === '.'){
            let tempBool = true;
            if(calculated){
                input = result.innerHTML;
                result.innerHTML = '';
                calculated = false;
            }
            for(a = input.length-1;a >= 0;a--){
                if(input.charAt(a) == '*'||input.charAt(a) === '+'||input.charAt(a) === '/'||input.charAt(a) === '-'||input.charAt(a) === '='){
                    break;
                }
                if(input.charAt(a) === '.'){
                    tempBool = false;
                    break;
                }
            }
            if(tempBool) input += button.className;
        }
        else if(button.className === 'backspace'){
            if(input === '') return;
            if(calculated){
                input = result.innerHTML;
                result.innerHTML = '';
                calculated = false;
            }
            input = input.substr(0,input.length-1);
        }
        else if(button.className === '='){
            if(calculated) return;
            if(input === '') return;
            if(input.charAt(input.length-1) === '.' || input.charAt(input.length-1) === '-' || input.charAt(input.length-1) === '+' || input.charAt(input.length-1) === '*' || input.charAt(input.length-1) === '/'){
                return;
            }
            calculated = true;
            input += '=';
            getNumbers();
            result.innerHTML = calculate().toString();
        }
        else{
            if(calculated){
                input = result.innerHTML;
                result.innerHTML = '';
                calculated = false;
            }
            input += button.className;
        } 
        let temp = '';
        for(a = 0;a < input.length;a++){
            if(input.charAt(a) === '=') break;
            temp += input.charAt(a);
        }
        display.innerHTML = temp;
    });
});

window.addEventListener('keydown',function(e){
    let key = document.querySelector(`button[key-code="${e.keyCode}"]`);
    if(e.keyCode === 188 || e.keyCode === 46) key = document.querySelector(`button[key-code="190"]`);
    else if(e.keyCode === 187) key = document.querySelector(`button[key-code="107"]`);
    else if(e.keyCode === 189) key = document.querySelector(`button[key-code="109"]`);
    else if(e.keyCode === 191) key = document.querySelector(`button[key-code="111"]`);
    if(key === null) return;

    console.log(key.className);

    if(key.id === 'op'){
        if(calculated){
            input = result.innerHTML;
            result.innerHTML = '';
            calculated = false;
        }
        if(input.length === 0) return;
        if(input.charAt(input.length-1) === '.' || input.charAt(input.length-1) === '-' || input.charAt(input.length-1) === '+' || input.charAt(input.length-1) === '*' || input.charAt(input.length-1) === '/'){
            return;
        }
        input += key.className;
    }
    else if(key.className === 'clr') {
        if(calculated){
            result.innerHTML = '';
            calculated = false;
        }
        input = '';
        arr =[];
    }
    else if(key.className === '.'){
        let tempBool = true;
        if(calculated){
            input = result.innerHTML;
            result.innerHTML = '';
            calculated = false;
        }
        for(a = input.length-1;a >= 0;a--){
            if(input.charAt(a) == '*'||input.charAt(a) === '+'||input.charAt(a) === '/'||input.charAt(a) === '-'||input.charAt(a) === '='){
                break;
            }
            if(input.charAt(a) === '.'){
                tempBool = false;
                break;
            }
        }
        if(tempBool) input += key.className;
    }
    else if(key.className === 'backspace'){
        if(input === '') return;
        if(calculated){
            input = result.innerHTML;
            result.innerHTML = '';
            calculated = false;
        }
        input = input.substr(0,input.length-1);
    }
    else if(key.className === '='){
        if(calculated) return;
        if(input === '') return;
        if(input.charAt(input.length-1) === '.' || input.charAt(input.length-1) === '-' || input.charAt(input.length-1) === '+' || input.charAt(input.length-1) === '*' || input.charAt(input.length-1) === '/'){
            return;
        }
        calculated = true;
        input += '=';
        getNumbers();
        result.innerHTML = calculate().toString();
    }
    else{
        if(calculated){
            input = result.innerHTML;
            result.innerHTML = '';
            calculated = false;
        }
        input += key.className;
    } 
    let temp = '';
    for(a = 0;a < input.length;a++){
        if(input.charAt(a) === '=') break;
        temp += input.charAt(a);
    }
    display.innerHTML = temp;

})