

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
    console.log(op);
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

function getNumber(op){
    console.log(input);
    let temp = input.replace(/([^0-9])/g,' ');
    let tempArr = temp.split(' ');
    console.log(temp);
    let obj = {};
    obj.num = parseInt(tempArr[tempArr.length - 1]);
    obj.op = op;
    return obj;
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
    input = Math.round(arr[a].num * 100)/100;
}

let opBool = true;
let calculated = false;
let input = '';
let display = document.querySelector('#display');
let buttons = document.querySelectorAll('.col button');
Array.from(buttons).forEach(button => {
    button.addEventListener('click',function(e){
        if(button.id === 'op'){
            if(calculated){
                let obj = {};
                obj.num = parseInt(input);
                obj.op = button.className;
                arr.push(obj);
            }
            else{
                if(opBool && arr.length === 0){
                    return;
                }
                arr.push(getNumber(button.className));
            }
            opBool = false;
            calculated = false;
            input += button.className;
            console.log(arr);
        }
        else if(button.className === 'clr') {
            calculated = false;
            input = '';
            arr =[];
        }
        else if(button.className === '='){
            if(opBool || calculated){
                return;
            }
            arr.push(getNumber('='));
            console.log(arr);
            opBool = true;
            calculated = true;
            calculate();
            arr = [];
        }
        else{
            calculated = false;
            opBool = false;
            input += button.className;
        } 
        display.innerHTML = input;
        console.log(input);
    });
});
