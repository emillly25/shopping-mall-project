import * as Api from '/api.js';

const pId = JSON.parse(window.localStorage.getItem('productId'))

async function orderRendering(){
    async function getOrders(id){
        const res = await Api.get('/api/product', id)
        const data = res.result
        const tableBody = document.querySelector('.tableBody')
        const htmlCode =`<li>
        <div class="itemImg"><img src="${data.imgUrl}"></div>
        <div data-id="${data._id}" class="itemName">${data.name}</div>
        <div class="qty">
            <input data-id="${data._id}" class="minus" type="button" value="-">
            <input id="num" data-id="${data._id}" class="num" type="number" value="1" min="1" step="1" style="width: 30px; height:30px; text-align:center;">
            <input data-id="${data._id}" class="plus" type="button" value="+">
        </div>
        <div data-id="${data._id}" class="itemPrice"></div>
    </li>`                         
    tableBody.insertAdjacentHTML('afterbegin',htmlCode)
    }
    
    for(let i = 0; i < pId.length; i++){
        await getOrders(pId[i]._id)
    }

    firstView()

    
    const minus = document.querySelectorAll('.minus');  
    const plus = document.querySelectorAll('.plus');  
    plus.forEach(el=> el.addEventListener('click', handleUpdateQuantity))
    minus.forEach(el=> el.addEventListener('click', handleUpdateQuantity))
}


//함수 1. localStorage 정보 받와서 초기 수량 및 가격 랜더링 
function firstView(){
    const num =  document.querySelectorAll('.num')
    const numArr = Array.prototype.slice.call(num)
    const productIdArr = JSON.parse(window.localStorage.getItem('productId'))
    const itemPrice = document.querySelectorAll('.itemPrice')
    const itemPriceArr = Array.prototype.slice.call(itemPrice)
    
    productIdArr.map(el=>{
        const id = el._id
        const quantity = el.quantity
        const price = el.price
        const n = numArr.find(el=> el.dataset.id === id)
        const t = itemPriceArr.find(el=> el.dataset.id === id)
        const firstPrice = Number(price) / Number(quantity)
        n.value = Number(quantity)
        t.innerText = Number(firstPrice) * Number(n.value)  
    })
    calcPay() 
}

//함수 2. 결제상세 계산하는 함수
function calcPay(){
    const productPrice = document.querySelector('#productPrice');
    const deliveryPrice = document.querySelector('#deliveryPrice')
    const finalPrice= document.querySelector('#finalPrice');
    const itemPrice = document.querySelectorAll('.itemPrice')
    const itemPriceArr = Array.prototype.slice.call(itemPrice)
    let sum = 0;
    itemPriceArr.forEach(el=> {
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


// 배송지 작성
const payBtn = document.querySelector('#payBtn');
const btn = document.getElementById('searchAddressButton');
const receiverNameInput = document.querySelector('#receiverName');
const receiverPhoneNumberInput = document.querySelector('#receiverPhoneNumber');
const receiverEmailInput = document.querySelector('#receiverEmail');
const postalCodeInput = document.querySelector('#postalCode');
const address1Input = document.querySelector('#address1');
const address2Input = document.querySelector('#address2');
const requestSelectBox = document.querySelector('#requestSelectBox');

// 함수 4. 주소찾기 API
async function addressSearch(){
    new daum.Postcode({
        oncomplete: function (data) {
            let addr = '';
            let extraAddr = '';
            if (data.userSelectedType === 'R') {
                addr = data.roadAddress;
            } else {
                addr = data.jibunAddress;
            }
            if (data.userSelectedType === 'R') {
                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                    extraAddr += data.bname;
                }
                if (data.buildingName !== '' && data.apartment === 'Y') {
                    extraAddr += extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
                }
                if (extraAddr !== '') {
                    extraAddr = ' (' + extraAddr + ')';
                }
            } else {
    }
        postalCodeInput.value = data.zonecode;
        address1Input.value = `${addr} ${extraAddr}`;
        address2Input.placeholder = '상세 주소를 입력해 주세요.';
        address2Input.focus();
    },
    }).open();
}

// 함수 5. 주문하기
async function orderHandler(){
    const fullName = receiverNameInput.value;
    const email = receiverEmailInput.value;
    const phoneNumber = receiverPhoneNumberInput.value;
    const postalCode = postalCodeInput.value;
    const address1 = address1Input.value;
    const address2 = address2Input.value;
    const request = requestSelectBox.value;
    const address = { postalCode , address1 , address2 }
    const order_data = []
    let sum = 0
    const data = JSON.parse(window.localStorage.getItem('productId'))

    for(let i = 0; i < data.length; i++){
        const id = data[i]._id
        const res = await Api.get('/api/product', id)
        const title = res.result.name
        const result = `${title}/${data[i].quantity}개`
        order_data.push(result)
        sum += Number(data[i].price)
    }
    const price = sum
    

    
    
    if (!fullName || !phoneNumber|| !email || !postalCode || !address2) {
        return alert("배송지 정보를 모두 입력해 주세요.")
    }

    const deliveryData = {
        fullName, email, address , phoneNumber, order_data, price,  request
    }
    console.log(deliveryData)
    await Api.post('/api/order', deliveryData)
    location.href = '/order-complete'
    window.localStorage.removeItem('productId')
}  



//배송지 주소 검색
btn.addEventListener('click', addressSearch);

//최종 구매버튼 post 요청
payBtn.addEventListener('click', orderHandler);


//최초 화면 랜더링
orderRendering()