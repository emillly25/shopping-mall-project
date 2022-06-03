import * as Api from '/api.js';


// 함수 0. DB데이터 불러와서 랜더링
async function getBookInfo(){
  const productId = window.location.href.split('=')[1]
  const res = await Api.get('/api/product', productId)
  const data = res.result
  const items = document.querySelector('.account')
  const htmlCode = `<div class="account-page-title">
  <div class="book_head">
    <div class="bookName">${data.name}</div>
    <div class="book_info">
      <span id="author"${data.author}></span>
      <span id="publish">${data.publisher}</span>
      <span id="pubDate">${data.publishedDate}</span>
    </div>
  </div>
</div>
<div class="account-page-body">
  <div class="book_body">
    <div class="bookImg"><img src="${data.imgUrl}"/></div>

    <div class="book_details">
      <div class="book-keys">
        <div class="key">정가</div>
        <div class="key">판매가</div>
        <div class="key">배송료</div>
        <div class="key">수량</div>
        <div class="key">책 소개</div>
      </div>
      <div class="book-values">
        <div class="value" id="fixedPrice"><span>${
          Math.floor(Math.round(data.price/ 0.9) / 100) * 100}</span> 원</div>

        <div class="value bookPrice" id="nowPrice">
          <span>${data.price}</span>원 (10% 할인)
        </div>
        <div class="value" id="deliveryPrice">
          원
        </div>
        <div class="value" id="quantity">
          <div class="qty">
            <input data-id="${data._id}" class="minus" type="button" value="-" />
            <input data-id="${data._id}"
              id="num"
              type="number"
              value="1"
              min="1"
              step="1"
              style="width: 30px; height: 30px; text-align: center"
            />
            <input data-id="${data._id}" class="plus" type="button" value="+" />
          </div>
          <div class="Ritem total_price">
            총 상품금액 <span id="total" data-id="${data._id}"></span>원
          </div>
        </div>
        <div class="value" id="bookInformation">
          ${data.information}
        </div>
      </div>
    </div>
    <div class="btn">
      <div class="cartBtn">
        <input data-id="${data._id}" id="cartBtn" type="button" value="장바구니" />
      </div>
      <div class="buyBtn">
        <input id="buyBtn" type="button" value="바로구매" />
      </div>
    </div>
  </div>
</div>`

  items.innerHTML = htmlCode
  const minus = document.querySelector('.minus')
  const plus = document.querySelector('.plus')
  plus.addEventListener('click', handleUpdateQuantity)
  minus.addEventListener('click', handleUpdateQuantity)

  const cartBtn = document.querySelector('#cartBtn')
  cartBtn.addEventListener('click', addToCart)
  buyNow()

}

getBookInfo();


// 함수 1. 수량조절 버튼
function handleUpdateQuantity(e){
  const num =  document.querySelector('#num')
  const productIdArr = JSON.parse(window.localStorage.getItem('productId')) 
  if (e.target.classList.contains('minus')){
      num.stepDown()
      updateLocalStorage(e,productIdArr)
  } else {
      num.stepUp()
      updateLocalStorage(e,productIdArr)
  }
  updateCalc()
  
}

// 함수 2. 결제정보 계산
function updateCalc(){
  const num = document.querySelector('#num')
  const nowPrice = document.querySelector('#nowPrice span')
  const deliveryPrice = document.querySelector('#deliveryPrice')
  const totalPrice = document.querySelector('#total')
  const quantity = Number(num.value)
  const price = quantity * Number(nowPrice.textContent)
  if (price >= 12000) {
    deliveryPrice.innerText = 0;
    totalPrice.innerText = Number(deliveryPrice.textContent) + price
  } else {
    deliveryPrice.innerText = 3000;
    totalPrice.innerText = Number(deliveryPrice.textContent) + price
  }
}


//함수 3. 수량버튼결과에 따른 localStorage 업데이트 함수
function updateLocalStorage(e, localArr){
  if(localArr === null){
    return
  }else{
    const id = e.target.dataset.id
    const num = document.querySelector('#num') 
    const idx = localArr.findIndex(el=>el._id === id)
    const firstPrice = Number(localArr[idx].price)/ Number(localArr[idx].quantity)
    localArr[idx].quantity = Number(num.value)
    localArr[idx].price = Number(firstPrice) * Number(num.value)
    window.localStorage.setItem('productId', JSON.stringify(localArr))
  } 
}



// 4. 장바구니 중복방지하면서 담기
function addToCart(){
  const saveBooks = [];
  const localCart = window.localStorage.getItem('productId')
  const id = window.location.href.split('=')[1]
      if(localCart === null){
          const num = document.querySelector('#num');
          const bookPrice = document.querySelector('#nowPrice span');
          const q = num
          const p =  bookPrice
          const obj = {};
          obj._id = id;
          obj.quantity = Number(q.value);
          obj.price = Number(q.value) * Number(p.textContent);
          saveBooks.push(obj);
          window.localStorage.setItem('productId', JSON.stringify(saveBooks));
          moveCart();
      }else{
          const testArr = JSON.parse(window.localStorage.getItem('productId'))
          const idx = testArr.findIndex(el=> el._id === id)
          if(idx !== -1){
          alert('이미 장바구니에 담긴 상품입니다.')
          if(confirm('장바구니로 이동하시겠습니까?')){
              location.href = '/cart'
          }
          return
          }else{
          console.log('주문 계속 진행해')
          const num = document.querySelector('#num');
          const bookPrice = document.querySelector('#nowPrice span');
          const q = num
          const p = bookPrice
          const obj = {};
          obj._id = id;
          obj.quantity = Number(q.value);
          obj.price = Number(q.value) * Number(p.textContent);
          saveBooks.push(obj);
          const newBooks = saveBooks.concat(JSON.parse(localCart));
          window.localStorage.setItem('productId', JSON.stringify(newBooks));
          moveCart();
          }
      }
}


//4-1. 장바구니 이동여부 체크 함수
function moveCart() {
  if (confirm(`장바구니에 추가되었습니다. 장바구니로 이동하시겠습니까? `)) {
      location.href = '/cart';
  }
}



// 함수 5. 바로 구매하기
function buyNow() {
  const buyBtn = document.querySelector('#buyBtn')
  const num = document.querySelector('#num')
  const totalPrice = document.querySelector('#total')
  const buyArr = [];
  buyBtn.addEventListener('click', function () {
    // 해당 제품의 아이디, 가격, 수량을 로컬스토리지에 저장하고 구매페이지로 이동
    const id = window.location.href.split('=')[1]
    const q = Number(num.value);
    const price = totalPrice.textContent;
    const obj = {};
    obj._id = id;
    obj.quantity = q;
    obj.price = Number(price);
    buyArr.push(obj);
    window.localStorage.setItem('buyProductId', JSON.stringify(buyArr));
    window.location.href = '/oneorder';
  });
}









