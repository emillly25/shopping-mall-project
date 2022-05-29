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

// 기본 랜더링
itemQaun.innerText = Number(num.value);
itemTotalPrice.innerText = Number(num.value) * price;
productPrice.innerText = Number(itemTotalPrice.textContent) ;
if(productPrice.textContent >=12000){
    deliveryPrice.innerText = 0
}else{
    deliveryPrice.innerText = 3000
}
finalPrice.innerText = Number(productPrice.textContent) + Number(deliveryPrice.textContent)


//수량버튼에 따른 결과 랜더링
function handleUpdateQuantity(e) {
    if (e.target.classList.contains('minus')) {
        num.stepDown()
        getInfo()
        getPrice()
    } else {
        num.stepUp()
        getInfo()
        getPrice()
    }
}


plus.addEventListener('click', handleUpdateQuantity)
minus.addEventListener('click', handleUpdateQuantity)

function getInfo(){
    itemQaun.innerText = Number(num.value);
    itemTotalPrice.innerText = Number(num.value) * price;
}

function getPrice(){
    productPrice.innerText = Number(itemTotalPrice.textContent) ;
if(productPrice.textContent >=12000){
    deliveryPrice.innerText = 0
}else{
    deliveryPrice.innerText = 3000
}
finalPrice.innerText = Number(productPrice.textContent) + Number(deliveryPrice.textContent)
}


}

addList();










