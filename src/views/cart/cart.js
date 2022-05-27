const items = document.querySelector('#items')  //ul


const addList = async function(){
    const res = await fetch('../booklist/booklist.json');
    const data = await res.json();
    const { name, price, imgUrl} = data;
    items.innerHTML += `<li class="item">
    <div class="checkbox"><input type="checkbox"></div>
    <div class="itemImg"><img src="${imgUrl}" width="100px" height="100px" alt=""></div>
    <div class="itemName">
        <div id="title">${name}</div>
        <div class="qty">
            <input class="minus" type="button" value="-">
            <input id ="num" type="number" value="1" min="1" step="1" style="width: 30px; height:30px; text-align:center;">
            <input class="plus" type="button" value="+">
        </div>
    </div>
    <div class="itemCalc">
        <span id="itemPrice">${price}</span>
        <span><i class="fa-solid fa-xmark"></i></span>
        <span id="itemQaun"></span>
        <span><i class="fa-solid fa-equals"></i></span>
        <span id="itemTotalPrice"></span>
    </div>
</li>`

const minus = document.querySelector('.minus');  //minus Btn
const plus = document.querySelector('.plus');   //plus Btn
const num = document.querySelector('#num');  //input(number)
const itemQaun = document.querySelector('#itemQaun'); //제품 수량(span)
const itemTotalPrice = document.querySelector('#itemTotalPrice') //최종가격
const productPrice = document.querySelector('#productPrice');
const deliveryPrice = document.querySelector('#deliveryPrice')
const finalPrice= document.querySelector('#finalPrice');

itemQaun.innerText = Number(num.value);
itemTotalPrice.innerText = Number(num.value) * price;
productPrice.innerText = price;
if(price >=12000){
    deliveryPrice.innerText = 0
}else{
    deliveryPrice.innerText = 3000
}
finalPrice.innerText = Number(productPrice.textContent) + Number(deliveryPrice.textContent)

plus.addEventListener('click', ()=>{
    num.stepUp();
    itemQaun.innerText = Number(num.value);
    itemTotalPrice.innerText = price *  Number(num.value)
    productPrice.innerText = itemTotalPrice.textContent;
    if(Number(productPrice.textContent) >=12000){
        deliveryPrice.innerText = 0
    }else{
        deliveryPrice.innerText = 3000
    }
    const result = Number(deliveryPrice.textContent)+ Number(productPrice.textContent)
    finalPrice.innerText = result;
   

})
minus.addEventListener('click', ()=>{
    num.stepDown();
    itemQaun.innerText = Number(num.value);
    itemTotalPrice.innerText = price *  Number(num.value)
    productPrice.innerText = itemTotalPrice.textContent;
    if(Number(productPrice.textContent) >=12000){
        deliveryPrice.innerText = 0
    }else{
        deliveryPrice.innerText = 3000
    }
    
    const result = Number(deliveryPrice.textContent)+ Number(productPrice.textContent)
    finalPrice.innerText = result;
})








}
addList();
