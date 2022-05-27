const nowPrice = Number(document.querySelector('#nowPrice').textContent)
const total = document.querySelector('#total');


const minus = document.querySelector('.minus');
const plus = document.querySelector('.plus');
const num = document.querySelector('#num');

total.innerText = nowPrice
plus.addEventListener('click', plusHandler)
minus.addEventListener('click', minusHandler)

function plusHandler(){
    const quantity = Number(num.textContent);
    num.innerText = quantity + 1    
    total.innerText = `${nowPrice * Number(num.textContent)}`
}

function minusHandler(e){
    const quantity = Number(num.textContent);
    num.innerText = quantity - 1
    total.innerText = `${nowPrice * Number(num.textContent)}`
}




