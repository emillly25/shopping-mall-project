import * as Api from '/api.js';

const pId = JSON.parse(window.localStorage.getItem('buyProductId'))[0]
const dataId = pId._id
console.log(pId)

const res = await Api.get('/api/product', dataId)
const data = res.result
console.log(data)
const items = document.querySelector('#items')
const htmlCode = `<table border="1">
<th colspan="2" width="400px" style="text-align:center">상품이름</th>
<th style="text-align:center">수량</th>
<th style="text-align:center">가격</th>
<tr>
    <td><img src="${data.imgUrl}"></td>
    <td id="name" style="text-align:center; vertical-align: middle;">${data.name}</td>
    <td id="quan" style="text-align:center; vertical-align: middle;">
        <div class="qty">
            <input data-id="${data._id}" class="minus" type="button" value="-">
            <input id="num" data-id="${data._id}" class="num" type="number" value="${pId.quantity}" min="1" step="1" style="width: 30px; height:30px; text-align:center;">
            <input data-id="${data._id}" class="plus" type="button" value="+">
        </div>
    </td>
    <td id="data_price" style="text-align:center; vertical-align: middle;">${pId.price}</td>
</tr>
</table>`

items.insertAdjacentHTML('afterbegin',htmlCode)


calcPay()
controlQuantity()

function calcPay(){
  const productPrice = document.querySelector('#productPrice');
  const deliveryPrice = document.querySelector('#deliveryPrice')
  const finalPrice= document.querySelector('#finalPrice');
  const num = document.querySelector('.num');

  productPrice.innerText = Number(pId.price) * Number(num.value)
  if(Number(productPrice.textContent)>=12000){
      deliveryPrice.innerText = 0
  }else{
      deliveryPrice.innerText = 3000
  }
  finalPrice.innerText = Number(productPrice.textContent) + Number(deliveryPrice.textContent)
}

function controlQuantity(){
  const minus = document.querySelectorAll('.minus');  
  const plus =  document.querySelectorAll('.plus'); 
  const num =  document.querySelectorAll('.num');
  plus.forEach(el=> el.addEventListener('click', handleUpdateQuantity))
  minus.forEach(el=> el.addEventListener('click', handleUpdateQuantity))
}

function handleUpdateQuantity(e) {
  const num = document.querySelector('.num')
  const data_price = document.querySelector('#data_price');
  if (e.target.classList.contains('minus')){
      num.stepDown()
  } else {
      num.stepUp()
  }
  data_price.innerText = Number(num.value) * pId.price
  calcPay()
  updateBuyProductId()
}

//localStorage 업데이트
function updateBuyProductId(){
  const num = document.querySelector('.num')
  const arr = JSON.parse(window.localStorage.getItem('buyProductId'))[0]
  arr.quantity = Number(num.value)
  arr.price = Number(num.value) * pId.price
  window.localStorage.setItem('buyProductId', JSON.stringify([arr]))
}


// 배송지 작성
const payBtn = document.querySelector('#payBtn');
const btn = document.getElementById('searchAddressButton');
const receiverNameInput = document.querySelector('#receiverName');
const receiverPhoneNumberInput = document.querySelector('#receiverPhoneNumber');
const receiverEmailInput = document.querySelector('#receiverEmail');
const postalCodeInput = document.querySelector('#postalCode');
const searchAddressButton = document.querySelector('#searchAddressButton');
const address1Input = document.querySelector('#address1');
const address2Input = document.querySelector('#address2');
const requestSelectBox = document.querySelector('#requestSelectBox');



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
          extraAddr +=
            extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
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



async function orderHandler(){
    const fullName = receiverNameInput.value;
    const email = receiverEmailInput.value;
    const phoneNumber = receiverPhoneNumberInput.value;
    const postalCode = postalCodeInput.value;
    const address1 = address1Input.value;
    const address2 = address2Input.value;
    const request = requestSelectBox.value;
    const address = { postalCode , address1 , address2 }
    const order_data = [`${data.name}/${pId.quantity}`]
    const price = pId.price
    

  if (!fullName || !phoneNumber|| !email || !postalCode || !address2) {
    return alert("배송지 정보를 모두 입력해 주세요.")
  }


const deliveryData = {
  fullName, email, address , phoneNumber, order_data, price,  request
}

console.log(deliveryData)

const res = await Api.post('/api/order', deliveryData)
window.localStorage.remove()

}   

//배송지 주소 검색
btn.addEventListener('click', addressSearch);

//최종 구매버튼 post 요청
payBtn.addEventListener('click', orderHandler );
