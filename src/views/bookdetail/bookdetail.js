
const minus = document.querySelector('.minus');  //minus Btn
const plus = document.querySelector('.plus');   //plus Btn
const num = document.querySelector('#num');  //input(number)

const nowPrice = document.querySelector('#nowPrice'); //현재판매가
const totalPrice = document.querySelector('#total');  //총 결제금액(span태그)



plus.addEventListener('click', ()=>{
    num.stepUp();
    const quantity = Number(num.value); 
    const price = quantity * Number(nowPrice.textContent);
    totalPrice.innerText = price;
    

})
minus.addEventListener('click', ()=>{
    num.stepDown();
    const quantity = Number(num.value); 
    const price = quantity * Number(nowPrice.textContent);
    totalPrice.innerText = price;
})

const getBookInfo = async function(){
    const res = await fetch('../booklist/booklist.json');
    const data = await res.json();
    const  {name, author, price, information } = data;
    nowPrice.innerText = price;
    totalPrice.innerText = price;

}

getBookInfo()












