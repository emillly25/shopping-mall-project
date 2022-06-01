import * as Api from '/api.js';

// 1. localStorage에서 productId 받아오기
const pId = JSON.parse(window.localStorage.getItem('productId'))
const productId = []
pId.map(({_id})=>{
    productId.push(_id)
})

// 2. 받아온 productId로 db에 조회해서 해당 데이터들을 html코드로 랜더링
async function cartRendering(){
    const addList = async function(id){
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

    for(let i=0 ; i < productId.length; i++){
        await addList(productId[i])
    }

    //현재, html 코드는 다 붙여진 상황. 

    //수량 조절버튼 element 
    const minus = document.querySelectorAll('.minus');  //minus Btn
    const plus =  document.querySelectorAll('.plus');   //plus Btn
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
 


    //기본 랜더링
    function firstView(){
        const num =  document.querySelectorAll('.num'); 
        const numArr = Array.prototype.slice.call(num); 
        const rendering = JSON.parse(window.localStorage.getItem('productId'))
        numArr.forEach(num=>{
            const id= num.dataset.id
            const q = itemQuanArr.find(el=> el.dataset.id === id)
            const p = itemPriceArr.find(el=> el.dataset.id === id)
            const t = itemTotalPriceArr.find(el=> el.dataset.id === id)
            const r = rendering.find(el=> el._id === id)
            num.value = r.quantity;
            q.innerText = Number(r.quantity);
            t.innerText = Number(p.textContent) * Number(r.quantity)
        })
        calcPay() 
    }

    //결제상세 내역 랜더링
    function calcPay(){
        const itemTotalPrice =  document.querySelectorAll('.itemTotalPrice') 
        const productPrice = document.querySelector('#productPrice');
        const deliveryPrice = document.querySelector('#deliveryPrice')
        const finalPrice= document.querySelector('#finalPrice');
        const itemTotalPriceArr = Array.prototype.slice.call(itemTotalPrice); 

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



    //수량버튼에 따른 결과 랜더링
    function handleUpdateQuantity(e) {
        const dataId = e.target.dataset.id 
        const num =  document.querySelectorAll('.num'); //수량버튼값
        const itemPrice = document.querySelectorAll('.itemPrice'); 
        const itemQuan = document.querySelectorAll('.itemQuan'); 
        const itemTotalPrice =  document.querySelectorAll('.itemTotalPrice') 
        const numArr = Array.prototype.slice.call(num); 
        const itemQuanArr = Array.prototype.slice.call(itemQuan); 
        const itemTotalPriceArr = Array.prototype.slice.call(itemTotalPrice); 
        const itemPriceArr = Array.prototype.slice.call(itemPrice); 

        const findNum = numArr.find(el=> el.dataset.id === dataId)
        const findPrice = itemPriceArr.find(el=> el.dataset.id === dataId)
        const findQuan = itemQuanArr.find(el=> el.dataset.id === dataId)
        const findTotalPrice = itemTotalPriceArr.find(el=> el.dataset.id === dataId)

        //localStorage(productId) 업데이트
        function updateProductId(){
            const itemQuan = document.querySelectorAll('.itemQuan'); 
            const itemTotalPrice =  document.querySelectorAll('.itemTotalPrice') 
            const itemQuanArr = Array.prototype.slice.call(itemQuan); 
            const itemTotalPriceArr = Array.prototype.slice.call(itemTotalPrice); 
            const findQuan = itemQuanArr.find(el=> el.dataset.id === dataId)
            const findTotalPrice = itemTotalPriceArr.find(el=> el.dataset.id === dataId)
            const localItems = JSON.parse(window.localStorage.getItem('productId'))
            const idx = localItems.findIndex(el=> el._id === dataId)
            localItems[idx].quantity = Number(findQuan.textContent)
            localItems[idx].price = Number(findTotalPrice.textContent)
            window.localStorage.setItem('productId', JSON.stringify(localItems))
        }

        // 위에까지는 변수랑 함수 선언한거고 여기부터가 실행부

        if (e.target.classList.contains('minus')) {
            findNum.stepDown()
            findQuan.innerText = Number(findNum.value)
            findTotalPrice.innerText = Number(findQuan.textContent) * Number(findPrice.textContent)
            updateProductId()  //localStorage(productId) 업데이트
        } else {
            findNum.stepUp()
            findQuan.innerText = Number(findNum.value)
            findTotalPrice.innerText = Number(findQuan.textContent) * Number(findPrice.textContent)
            updateProductId() //localStorage(productId) 업데이트
        }
        calcPay()
    }

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


    // 함수 실행
    firstView()
    calcPay()
    plus.forEach(el=> el.addEventListener('click', handleUpdateQuantity))
    minus.forEach(el=> el.addEventListener('click', handleUpdateQuantity))
    checkingBox()
}


cartRendering()


//주문정보 넘기기
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

order()







