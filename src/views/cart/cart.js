import * as Api from '/api.js';

// localStorage에서 productId 받아오기
const pId = JSON.parse(window.localStorage.getItem('productId'))
const productId = []  //장바구니에 있는 아이템의 id배열
pId.map(({_id})=>{
    productId.push(_id)
})



async function cartRendering(){
    // 함수0. localStorage의 id를 이용해 db에 접근해 데이터 불러와 html랜더링
    async function addList(id){
        const res = await Api.get('/api/product', id)
        const data = res.result
        const items = document.querySelector('#items')  
        const htmlCode =`<li class="item">
        <div><input data-id="${data._id}" class="checkbox" type="checkbox"></div>
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


    //수량 조절버튼 element 
    const num =  document.querySelectorAll('.num');  //input(number)
    
    //각 제품별 수량과 최종 가격
    const itemPrice = document.querySelectorAll('.itemPrice'); //제품 가격(개당)
    const itemQuan = document.querySelectorAll('.itemQuan'); //제품 수량(span)
    const itemTotalPrice =  document.querySelectorAll('.itemTotalPrice') //최종가격

    
    //결제 부분에 보여지는 가격(html에서 가져옴)
    const productPrice = document.querySelector('#productPrice');
    const deliveryPrice = document.querySelector('#deliveryPrice')
    const finalPrice= document.querySelector('#finalPrice');

    // 체크박스 관련
    const allCheckBtn = document.querySelector('#allCheckBtn') //전체선택 버튼
    const all = document.querySelector('#choice .all')  //전체선택 글자(div)
    const some = document.querySelector('#choice .some') //선택삭제 글자(div)
    const checkBox = document.querySelectorAll('.checkbox')  // 제품 옆에 있는 모든 체크박스

    // NodeList to Arr
    const numArr = Array.prototype.slice.call(num); 
    const itemQuanArr = Array.prototype.slice.call(itemQuan); 
    const itemTotalPriceArr = Array.prototype.slice.call(itemTotalPrice); 
    const itemPriceArr = Array.prototype.slice.call(itemPrice); 
    const checkBoxArr = Array.prototype.slice.call(checkBox); 



    //전체선택 (checkbox)
    allCheckBtn.addEventListener('change',function(e){
        const minus = document.querySelectorAll('.minus'); 
        const minusArr = Array.prototype.slice.call(minus); 
        const plus = document.querySelectorAll('.plus'); 
        const plusArr = Array.prototype.slice.call(plus); 
        if(e.target.checked === true){
            checkBoxArr.forEach(el=> el.checked = true)
            all.innerText = '전체삭제'
            minusArr.forEach(el=>el.removeEventListener('click',handleUpdateQuantity))
            plusArr.forEach(el=>el.removeEventListener('click',handleUpdateQuantity))
        }else{
            checkBoxArr.forEach(el=> el.checked = false)
            all.innerText = '전체선택'
            minusArr.forEach(el=>el.addEventListener('click',handleUpdateQuantity))
            plusArr.forEach(el=>el.addEventListener('click',handleUpdateQuantity))
        }
    
    })

    //전체삭제 (localStroage에서도 삭제)
    all.addEventListener('click',function(){  
        for(let i = 0; i < checkBox.length; i++){
            if(checkBox[i].checked){
                checkBox[i].parentElement.parentElement.remove()
            }
        }
        window.location.reload()
        window.localStorage.clear();
    })

    //선택삭제
    some.addEventListener('click',function(){
        let CheckedId = []
        for(let i = 0; i < checkBox.length; i++){
            if(checkBox[i].checked){
                checkBox[i].parentElement.parentElement.remove()
                CheckedId.push(checkBox[i].dataset.id) //각 제품의 _id
                
            }
            
        }
        console.log('선택된 id',CheckedId) //삭제 예정 _id 모아둔 배열
        const arr = JSON.parse(window.localStorage.getItem('productId'))
        //선택삭제하고 남은 배열은 다시 localStorage에 보내야.
        const newArr = arr.filter(el=>{
            return CheckedId.findIndex(e=> e === el._id) === -1
        })
        window.location.reload()
        window.localStorage.setItem('productId',JSON.stringify(newArr))
    })





    //check 여부 확인해서 localStorage(checkBuy)에 업데이트하는 함수
    function checkingBox(){
        const checkBox = document.querySelectorAll('.checkbox') 
        const checkBoxArr = Array.prototype.slice.call(checkBox)
        const minus = document.querySelectorAll('.minus');  //minus Btn
        const minusArr = Array.prototype.slice.call(minus); 
        const plus =  document.querySelectorAll('.plus');   //plus Btn
        const plusArr = Array.prototype.slice.call(plus); 
        const tempArr = []
        checkBoxArr.forEach(el=>{
            el.addEventListener('click',(e)=>{
                if(e.target.checked === true){
                    //체크되있을때 하고픈거
                    const dataId = e.target.dataset.id
                    const dataQuan = itemQuanArr.find(el=> el.dataset.id === dataId)
                    const dataPrice = itemTotalPriceArr.find(el=> el.dataset.id === dataId)
                    const obj = {}
                    obj._id = dataId
                    obj.quantity = Number(dataQuan.textContent) 
                    obj.price = Number(dataPrice.textContent)
                    tempArr.push(obj)
                    //체크된 버튼만 막아야지
                    const plusBtn = plusArr.find(el=>el.dataset.id === dataId)
                    const minusBtn = minusArr.find(el=>el.dataset.id === dataId)
                    plusBtn.removeEventListener('click',handleUpdateQuantity)
                    minusBtn.removeEventListener('click',handleUpdateQuantity)
                }else{
                    //체크해지되면 하고픈거
                    const i = tempArr.findIndex(el=>{
                        return el._id === e.target.dataset.id
                    })
                    tempArr.splice(i,1)
                    
                }
                console.log('최종', tempArr)
                window.localStorage.setItem('checkBuy', JSON.stringify(tempArr))
            })
            
        })
    }

    


    //실행
    // 1. 장바구니에 담긴 각 아이템들 html 랜더링
    for(let i=0 ; i < productId.length; i++){
        await addList(productId[i])
    }
    // 2. 첫화면 아이템별 가격정보 랜더링 
    firstView()   // calcPay() 포함되어 있는디...?

    // 3. 수량버튼
    const minus = document.querySelectorAll('.minus');  
    const plus = document.querySelectorAll('.plus');  
    plus.forEach(el=> el.addEventListener('click', handleUpdateQuantity))
    minus.forEach(el=> el.addEventListener('click', handleUpdateQuantity))

    // 5. 체크박스 확인
    checkingBox()
}


 //함수1. 아이템 별 가격내역 초기화 랜더링
function firstView(){
    const num =  document.querySelectorAll('.num')
    const numArr = Array.prototype.slice.call(num)
    const itemPrice = document.querySelectorAll('.itemPrice')
    const itemPriceArr = Array.prototype.slice.call(itemPrice)
    const itemQuan = document.querySelectorAll('.itemQuan')
    const itemQuanArr = Array.prototype.slice.call(itemQuan)
    const itemTotalPrice =  document.querySelectorAll('.itemTotalPrice') 
    const itemTotalPriceArr = Array.prototype.slice.call(itemTotalPrice)
    const productIdArr = JSON.parse(window.localStorage.getItem('productId'))    
    productIdArr.map(el=>{
        const id = el._id
        const quantity = el.quantity
        const price = el.price
        const n = numArr.find(q=>q.dataset.id === id)
        const p = itemPriceArr.find(q=>q.dataset.id === id)
        const q = itemQuanArr.find(q=>q.dataset.id === id)
        const t = itemTotalPriceArr.find(q=>q.dataset.id === id)
        n.value = Number(quantity)
        p.innerText = Number(price/quantity)
        q.innerText = Number(quantity)
        t.innerText = Number(p.textContent) * Number(q.textContent)  
    })
    calcPay() 
}

//함수2. 결제상세 내역 랜더링
function calcPay(){
    const productPrice = document.querySelector('#productPrice');
    const deliveryPrice = document.querySelector('#deliveryPrice')
    const finalPrice= document.querySelector('#finalPrice');
    const itemTotalPrice =  document.querySelectorAll('.itemTotalPrice') 
    const itemTotalPriceArr = Array.prototype.slice.call(itemTotalPrice); 
    let sum = 0;
    itemTotalPriceArr.forEach(el=> {
        sum += Number(el.textContent)
    })
    productPrice.innerText = sum
    if(Number(productPrice.textContent)>=12000){
        deliveryPrice.innerText = 0
    }else{
        deliveryPrice.innerText = 3000
    }
    finalPrice.innerText = Number(productPrice.textContent) + Number(deliveryPrice.textContent)
}

//함수3. 수량버튼에 따른 결과 랜더링
function handleUpdateQuantity(e) {
    const num =  document.querySelectorAll('.num') 
    const numArr = Array.prototype.slice.call(num)
    const n = numArr.find(el=> el.dataset.id === e.target.dataset.id)
    if (e.target.classList.contains('minus')) {
        n.stepDown()
        updateProductId(e)
    } else {
        n.stepUp()
        updateProductId(e)
    }
    firstView()
}

//함수 3-1. 수량버튼결과에 따른 localStorage 업데이트 함수
function updateProductId(e){
    const num =  document.querySelectorAll('.num') 
    const numArr = Array.prototype.slice.call(num)
    const n = numArr.find(el=> el.dataset.id === e.target.dataset.id)
    const productIdArr = JSON.parse(window.localStorage.getItem('productId'))
    const idx = productIdArr.findIndex(el=> el._id === e.target.dataset.id)
    const firstPrice = Number(productIdArr[idx].price)/ Number(productIdArr[idx].quantity)
    productIdArr[idx].quantity = Number(n.value)
    productIdArr[idx].price = Number(firstPrice) * Number(n.value)
    window.localStorage.setItem('productId', JSON.stringify(productIdArr))
}


//함수. 주문정보 넘기기
function order(){
    const buyBtn = document.querySelector('#buyBtn')
    const allCheckBtn = document.querySelector('#allCheckBtn') 
    buyBtn.addEventListener('click',function(){
        if(allCheckBtn.checked === true){
            window.localStorage.setItem('orderProductId','productId로 주문진행')
        }else{
            window.localStorage.setItem('orderCheckBuy','checkBuy로 주문진행')
        }
    })
}






//최종 랜더링 및 주문
cartRendering()
order()







