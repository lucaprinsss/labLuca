'use strict';

let arr = ['spring', 'it', 'cat', '012345678'];

function fun(string) {
    let res = '';
    let length = string.length;

    if(length >= 2){
        if (length === 2){
            res = string + string;
            return res;
        }
        //res = string.substring(0,2) + string.substring(length-2);
        res = string.slice(0, 2) + string.slice(-2); //.slice(0, 2) il secondo parametro indica da quale valore interrompere la splice (il valore con qull'indice è escluso)
        return res;
    }
    return res;
}

for(let s of arr){
    console.log(s+ ' : ' + fun(s));
}