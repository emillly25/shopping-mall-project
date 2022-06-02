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

    // 1. 장바구니에 담긴 각 아이템들 html 랜더링
    for(let i = 0 ; i < productId.length; i++){
        await addList(productId[i])
    }

    // 2. 첫화면 아이템별 가격정보 랜더링 
    firstView() 

    // 3. 수량버튼
    const minus = document.querySelectorAll('.minus');  
    const plus = document.querySelectorAll('.plus');  
    plus.forEach(el=> el.addEventListener('click', handleUpdateQuantity))
    minus.forEach(el=> el.addEventListener('click', handleUpdateQuantity))

    // 4. 체크박스 관련
    someControlAll()  //각 체크로 전체체크 제어
    allControlSome()  //전체체크로 각 체크 제어
    allCheckDelete() //전체삭제
    selectedDelete() //선택삭제
    checkingStatus() //체크여부에 따른 데이터 저장

    function preventRepeat(){
        
    }
}

 //함수 1. 아이템 별 가격내역 초기화 랜더링
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

//함수 2. 결제상세 내역 랜더링
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

//함수 3. 수량버튼에 따른 결과 랜더링
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
    const id = e.target.dataset.id
    const num =  document.querySelectorAll('.num') 
    const numArr = Array.prototype.slice.call(num)
    const n = numArr.find(el=> el.dataset.id === id)
    const productIdArr = JSON.parse(window.localStorage.getItem('productId'))
    const idx = productIdArr.findIndex(el=> el._id === id)
    const firstPrice = Number(productIdArr[idx].price)/ Number(productIdArr[idx].quantity)
    productIdArr[idx].quantity = Number(n.value)
    productIdArr[idx].price = Number(firstPrice) * Number(n.value)
    window.localStorage.setItem('productId', JSON.stringify(productIdArr))
    
}

//함수 4. 체크박스 선택 여부에 따라 -> 전체선택 활성화/비활성화
function someControlAll(){
    const all = document.querySelector('#choice .all')
    const allCheckBtn = document.querySelector('#allCheckBtn')
    const checkBox = document.querySelectorAll('.checkbox')
    const checkBoxArr = Array.prototype.slice.call(checkBox)
    checkBoxArr.forEach(el=>{
        el.addEventListener('change',()=>{
            if(checkBoxArr.every(el=>el.checked === true)){
                allCheckBtn.checked = true;
                all.innerText = '전체삭제'
            }else{
                allCheckBtn.checked = false;
                all.innerText = '전체선택'
            }
        })
    })
}

//함수 4-1. 전체체크박스 상태에 따른  ->  선택체크박스 활성화/비활성화
function allControlSome(){
    const all = document.querySelector('#choice .all')
    const allCheckBtn = document.querySelector('#allCheckBtn')
    const checkBox = document.querySelectorAll('.checkbox')
    const checkBoxArr = Array.prototype.slice.call(checkBox)
    allCheckBtn.addEventListener('change',function(e){
        if(e.target.checked === true){
            checkBoxArr.forEach(el=> el.checked = true)
            all.innerText = '전체삭제'
        }else{
            checkBoxArr.forEach(el=> el.checked = false)
            all.innerText = '전체선택'
        }
    })
}

//함수 5. 전체선택 삭제
function allCheckDelete(){
    const allCheckBtn = document.querySelector('#allCheckBtn')
    const all = document.querySelector('#choice .all')
    const checkBox = document.querySelectorAll('.checkbox')
    all.addEventListener('click',function(){
        if(allCheckBtn.checked === true){
            for(let i = 0; i < checkBox.length; i++){
                checkBox[i].parentElement.parentElement.remove()
            }
            noMoreCartUpdatePay()
        }
    })
}

// 함수 6. 장바구니가 비워지면 결제정보 모두 삭제
function noMoreCartUpdatePay(){
    const allCheckBtn = document.querySelector('#allCheckBtn')
    const checkBox = document.querySelectorAll('.checkbox')
    const productPrice = document.querySelector('#productPrice')
    const deliveryPrice = document.querySelector('#deliveryPrice')
    const finalPrice = document.querySelector('#finalPrice') 
    
    if(checkBox.length === 0){
        window.localStorage.clear()
        productPrice.innerText = 0
        deliveryPrice.innerText = 0
        finalPrice.innerText = 0
        allCheckBtn.checked = false
    }
}


//함수 7. 선택삭제
function selectedDelete(){
    const selected = document.querySelector('#choice .selected')
    const checkBox = document.querySelectorAll('.checkbox')
    const checkBoxArr = Array.prototype.slice.call(checkBox) 
    selected.addEventListener('click',function(e){
        
        for(let i = 0; i < checkBox.length; i++){
            if(checkBox[i].checked){
                checkBox[i].parentElement.parentElement.remove()
                const nonSelected = checkBoxArr.filter(el=>{
                    return el.checked === false
                })
                const productIdArr = JSON.parse(window.localStorage.getItem('productId'))
                const updateArr = []
                nonSelected.map(el=>{
                    const updateItem = productIdArr.filter(item => item._id === el.dataset.id)[0]
                    updateArr.push(updateItem)
                })
                window.localStorage.setItem('productId', JSON.stringify(updateArr))
                firstView()
                noMoreCartUpdatePay()
            }
        }
    })
}

// 함수 8. 체크박스 체킹여부에 따라 임시localStorage에 저장했다 뺐다 하는 함수
function checkingStatus(){
    const checkBox = document.querySelectorAll('.checkbox')
    const checkBoxArr = Array.prototype.slice.call(checkBox)
    const tempArr = []
    checkBoxArr.forEach(el=>{
        el.addEventListener('change',function(e){
            if(e.target.checked === true){
                const result = makingObj(e)
                tempArr.push(result)
            }else{
                const idx = tempArr.findIndex(i=>{
                    return i._id === e.target.dataset.id
                })
                tempArr.splice(idx,1)
            }
            window.localStorage.setItem('tempCart', JSON.stringify(tempArr))
            console.log(tempArr)
        })
    })
}

// 함수 9. localStorage에 업데이트할 obj만드는 함수
function makingObj(e){
    const num =  document.querySelectorAll('.num')
    const numArr = Array.prototype.slice.call(num)
    const n = numArr.find(q=>q.dataset.id === e.target.dataset.id)
    const itemPrice = document.querySelectorAll('.itemPrice')
    const itemPriceArr = Array.prototype.slice.call(itemPrice)
    const p = itemPriceArr.find(q=>q.dataset.id === e.target.dataset.id)
    const obj = {}
    obj._id = e.target.dataset.id
    obj.quantity = Number(n.value)
    obj.price = Number(n.value) * Number(p.textContent)
    return obj
}



//함수 10. 주문정보 넘기기
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







