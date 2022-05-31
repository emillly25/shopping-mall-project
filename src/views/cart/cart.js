import * as Api from '/api.js';




const pId = JSON.parse(window.localStorage.getItem('productId'))
const productId = []
pId.map(({_id})=>{
    productId.push(_id)
})

 //결제 부분에 보여지는 가격(html에서 가져옴)
const productPrice = document.querySelector('#productPrice');
const deliveryPrice = document.querySelector('#deliveryPrice')
const finalPrice= document.querySelector('#finalPrice');


async function a(){
    const addList = async function(id){
        const res = await Api.get('/api/product', id)
        console.log('res',res)
        const data = res.result
        const items = document.querySelector('#items')  
        const htmlCode =`<li class="item">
       <div class="checkbox"><input type="checkbox"></div>
       <div class="itemImg"><a href="/bookdetail/?productId=${data._id}"><img src="${data.imgUrl}" width="100px" height="100px" alt=""></a></div>
       <div class="itemName">
           <div id="title"><a href="/bookdetail/?productId=${data._id}">${data.name}</a></div>
           <div class="qty">
               <input data-id="${data._id}" class="minus" type="button" value="-">
               <input data-id="${data._id}" class="num" type="number" value="1" min="1" step="1" style="width: 30px; height:30px; text-align:center;">
               <input data-id="${data._id}" class="plus" type="button" value="+">
           </div>
       </div>
       <div class="itemCalc">
           <span data-id="${data._id}" class="itemPrice">${data.price}</span>
           <span><i class="fa-solid fa-xmark"></i></span>
           <span data-id="${data._id}" class="itemQuan"></span>
           <span><i class="fa-solid fa-equals"></i></span>
           <span data-id="${data._id}" class="itemTotalPrice"></span>
       </div>
    </li>`
    items.insertAdjacentHTML('afterbegin', htmlCode);
    }

    for(let i=0 ; i < productId.length; i++){
        await addList(productId[i])
    }

    //수량 조절버튼 element 
    const minus = document.querySelectorAll('.minus');  //minus Btn
    const plus =  document.querySelectorAll('.plus');   //plus Btn
    const num =  document.querySelectorAll('.num');  //input(number)
    
    //각 제품별 수량과 최종 가격
    const itemPrice = document.querySelectorAll('.itemPrice'); //제품 가격(개당)
    const itemQuan = document.querySelectorAll('.itemQuan'); //제품 수량(span)
    const itemTotalPrice =  document.querySelectorAll('.itemTotalPrice') //최종가격

    // NodeList to Arr
    const numArr = Array.prototype.slice.call(num); 
    const itemQuanArr = Array.prototype.slice.call(itemQuan); 
    const itemTotalPriceArr = Array.prototype.slice.call(itemTotalPrice); 
    const itemPriceArr = Array.prototype.slice.call(itemPrice); 



    //기본 랜더링
    function firstView(){
        const rendering = JSON.parse(window.localStorage.getItem('productId'))

        numArr.forEach(num=>{
            const id= num.dataset.id
            const q = itemQuanArr.find(el=> el.dataset.id === id)
            const p = itemPriceArr.find(el=> el.dataset.id === id)
            const t = itemTotalPriceArr.find(el=> el.dataset.id === id)
            const r = rendering.find(el=> el._id === id)
            num.value = r.quantity;
            q.innerText = r.quantity;
            t.innerText = Number(p.textContent) * Number(r.quantity)
        })

        let s = 0;
        itemTotalPriceArr.forEach(el=> {
            s += Number(el.textContent)
        })
        productPrice.innerText = s
        if(Number(productPrice.textContent)>=12000){
            deliveryPrice.innerText = 0
        }else{
            deliveryPrice.innerText = 3000
        }
        finalPrice.innerText = Number(productPrice.textContent) + Number(deliveryPrice.textContent)

    }
    firstView()




    //수량버튼에 따른 결과 랜더링
    function handleUpdateQuantity(e) {
        if (e.target.classList.contains('minus')) {
            const minusId = e.target.dataset.id
            const result = numArr.find(el=> el.dataset.id === minusId)
            const quan = itemQuanArr.find(el=> el.dataset.id === minusId)
            const totalPrice = itemTotalPriceArr.find(el=> el.dataset.id === minusId)
            const itemPrice =  itemPriceArr.find(el=> el.dataset.id === minusId)
            result.stepDown()
            quan.innerText = result.value
            totalPrice.innerText =  Number(quan.textContent) * Number(itemPrice.textContent)
            
        } else {
            const plusId = e.target.dataset.id
            const result = numArr.find(el=> el.dataset.id === plusId)
            const quan = itemQuanArr.find(el=> el.dataset.id === plusId)
            const totalPrice = itemTotalPriceArr.find(el=> el.dataset.id === plusId)
            const itemPrice =  itemPriceArr.find(el=> el.dataset.id === plusId)
            result.stepUp()
            quan.innerText = result.value
            quan.innerText = result.value
            totalPrice.innerText = Number(quan.textContent) * Number(itemPrice.textContent)
            
        }
        let sum = 0
        itemTotalPriceArr.forEach(el=>{sum += Number(el.textContent)})
        productPrice.innerText = sum 
        if(Number(productPrice.textContent)>=12000){
            deliveryPrice.innerText = 0
        }else{
            deliveryPrice.innerText = 3000
        }
        finalPrice.innerText = Number(productPrice.textContent) + Number(deliveryPrice.textContent)
    }

    plus.forEach(el=> el.addEventListener('click', handleUpdateQuantity ))
    minus.forEach(el=> el.addEventListener('click', handleUpdateQuantity))


}






a()


    









