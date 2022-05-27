import book  from '../booklist/booklist.js';

const items = document.querySelector('#items')  //ul


const addList = async function(){
    const res = await fetch('../booklist/booklist.json');
    const data = await res.json();
    const { title, author, price, description } = data;
    items.innerHTML += `<li class="item">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
    <div class="checkbox"><input type="checkbox"></div>
    <div class="itemImg"><img src="https://image.aladin.co.kr/product/29045/74/cover500/k192836746_3.jpg" width="100px" height="100px" alt=""></div>
    <div class="itemName">${title}</div>
    <div class="itemCalc">
        <span id="itemPrice">${price}</span>
        <span><i class="fa-solid fa-xmark"></i></span>
        <span id="itemQaun">2</span>
        <span><i class="fa-solid fa-equals"></i></span>
        <span id="itemTotalPrice">32000</span>
    </div>
</li>`
}
addList();
