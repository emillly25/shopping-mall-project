import * as Api from '/api.js';
const bookName = document.querySelector('.bookName');
const bookAuthor = document.querySelector('.book_info #author');
const bookPublish = document.querySelector('.book_info #publish');
const bookPubDate = document.querySelector('.book_info #pubDate');
const bookImg = document.querySelector('.bookImg img');
const bookInformation = document.querySelector('#bookInformation');

const minus = document.querySelector('.minus'); //minus Btn
const plus = document.querySelector('.plus'); //plus Btn
const num = document.querySelector('#num'); //수량

const fixedPrice = document.querySelector('#fixedPrice span'); //정가
const nowPrice = document.querySelector('#nowPrice span'); //현재판매가
const deliveryPrice = document.querySelector('#deliveryPrice'); //배송비
const totalPrice = document.querySelector('#total'); //총 결제금액

const cartBtn = document.querySelector('#cartBtn');
const buyBtn = document.querySelector('#buyBtn');

// 함수 1. DB데이터 불러와서 랜더링
const getBookInfo = async function () {
  const productId = window.location.href.split('=')[1];
  const res = await Api.get('/api/product', productId);
  const book = res.result;
  bookName.innerText = book.name;
  bookAuthor.innerText = book.author;
  bookPublish.innerText = book.publisher;
  bookPubDate.innerText = book.publishedDate;
  bookImg.setAttribute('src', book.imgUrl);
  bookInformation.innerText = book.information;
};

// 함수 2. 가격정보 업데이트 
const getPrice = async function () {
  const productId = window.location.href.split('=')[1];
  const res = await Api.get('/api/product', productId);
  const book = res.result;
  nowPrice.innerText = book.price;
  if (Number(nowPrice.textContent) >= 12000) {
    deliveryPrice.innerText = 0;
  } else {
    deliveryPrice.innerText = 3000;
  }
  if (book.price >= 12000) {
    totalPrice.innerText = book.price;
  } else {
    totalPrice.innerText =
      Number(book.price) + Number(deliveryPrice.textContent);
  }
  fixedPrice.innerText = Math.floor(Math.round(book.price / 0.9) / 100) * 100;
};


//함수 3.수량조절 버튼
function handleUpdateQuantity(e) {
  if (e.target.classList.contains('minus')) {
    num.stepDown();
  } else {
    num.stepUp();
  }
  const quantity = Number(num.value); //수량 값
  const price = quantity * Number(nowPrice.textContent);
  if (price >= 12000) {
    deliveryPrice.innerText = 0;
    totalPrice.innerText = Number(deliveryPrice.textContent) + price;
  } else {
    deliveryPrice.innerText = 3000;
    totalPrice.innerText = Number(deliveryPrice.textContent) + price;
  }
}



// 4. 장바구니 중복방지하면서 담기
function addToCart(){
  const saveBooks = [];
  const localCart = window.localStorage.getItem('productId')
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
async function moveCart() {
  if (confirm(`장바구니에 추가되었습니다. 장바구니로 이동하시겠습니까? `)) {
      location.href = '/cart';
  }
}



// 함수 5. 바로 구매하기
async function buyNow() {
  const buyArr = [];
  buyBtn.addEventListener('click', function (e) {
    // 해당 제품의 아이디, 가격, 수량을 로컬스토리지에 저장하고 구매페이지로 이동
    const id = window.location.href.split('=')[1];
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


//함수 실행
getBookInfo();
getPrice();
buyNow();
addToCart()

plus.addEventListener('click', handleUpdateQuantity);
minus.addEventListener('click', handleUpdateQuantity);
cartBtn.addEventListener('click', addToCart);

