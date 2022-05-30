import * as Api from '/api.js';




const pId = JSON.parse(window.localStorage.getItem('productId'))
const productId = []
pId.map(({_id})=>{
    productId.push(_id)
})


const addList = async function(id){
    const res = await Api.get('/api/product', id)
    console.log('res',res)
    const data = res.result
    const items = document.querySelector('#items')  
    const htmlCode =`<li class="item">
   <div class="checkbox"><input type="checkbox"></div>
   <div class="itemImg"><img src="${data.imgUrl}" width="100px" height="100px" alt=""></div>
   <div class="itemName">
       <div id="title">${data.name}</div>
       <div class="qty">
           <input class="minus" type="button" value="-">
           <input class="num" type="number" value="1" min="1" step="1" style="width: 30px; height:30px; text-align:center;">
           <input class="plus" type="button" value="+">
       </div>
   </div>
   <div class="itemCalc">
       <span id="itemPrice">${data.price}</span>
       <span><i class="fa-solid fa-xmark"></i></span>
       <span class="itemQaun"></span>
       <span><i class="fa-solid fa-equals"></i></span>
       <span class="itemTotalPrice"></span>
   </div>
</li>`
items.insertAdjacentHTML('afterbegin', htmlCode);

    //수량 조절버튼 element
    const minus = document.querySelector('.minus');  //minus Btn
    const plus = document.querySelector('.plus');   //plus Btn
    const num = document.querySelector('.num');  //input(number)

    //각 제품별 수량과 최종 가격
    const itemQaun = document.querySelector('.itemQaun'); //제품 수량(span)
    const itemTotalPrice = document.querySelector('.itemTotalPrice') //최종가격



    // 아이템별 수량과 가격 계산
    function getPrice(){
        itemQaun.innerText = num.value
        itemTotalPrice.innerText = data.price * Number(itemQaun.textContent);
        
    }
    

    // 기본 랜더링
    getPrice()  


    //수량버튼에 따른 결과 랜더링
    function handleUpdateQuantity(e) {
        if (e.target.classList.contains('minus')) {
            num.stepDown()
            getPrice()
            calPrice()
        } else {
            num.stepUp()
            getPrice()
            calPrice()
        }
    }

plus.addEventListener('click', handleUpdateQuantity)
minus.addEventListener('click', handleUpdateQuantity)


}





for(let i=0 ; i < productId.length; i++){
    addList(productId[i])
}




function calPrice(){
//결제 부분에 보여지는 가격(html에서 가져옴)
const productPrice = document.querySelector('#productPrice');
const deliveryPrice = document.querySelector('#deliveryPrice')
const finalPrice= document.querySelector('#finalPrice');

productPrice.innerText = // 합계 계산만 하면됨.....

if(Number(productPrice.textContent)>=12000){
    deliveryPrice.innerText = 0
}else{
    deliveryPrice.innerText = 3000
}

finalPrice.innerText = Number(productPrice.textContent) + Number(deliveryPrice.textContent)

}

calPrice()




