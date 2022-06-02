import * as Api from '/api.js';
const bookName = document.querySelector('.bookName')
const bookAuthor = document.querySelector('.book_info #author')
const bookPublish = document.querySelector('.book_info #publish')
const bookPubDate = document.querySelector('.book_info #pubDate')
const bookImg = document.querySelector('.bookImg img')
const bookInformation =  document.querySelector('.bookInformation')

const minus = document.querySelector('.minus');  //minus Btn
const plus = document.querySelector('.plus');   //plus Btn
const num = document.querySelector('#num');    //수량 

const fixedPrice = document.querySelector('#fixedPrice span'); //정가
const nowPrice = document.querySelector('#nowPrice'); //현재판매가
const deliveryPrice = document.querySelector('#deliveryPrice'); //배송비
const totalPrice = document.querySelector('#total');  //총 결제금액

const cartBtn = document.querySelector('#cartBtn');
const buyBtn = document.querySelector('#buyBtn');

// DB데이터 불러와서 랜더링
const getBookInfo = async function(){
    const productId = (window.location.href).split('=')[1]
    const res = await Api.get('/api/product', productId)
    const book = res.result;
        bookName.innerText = book.name;
        bookAuthor.innerText = book.author;
        bookPublish.innerText = book.publisher;
        bookPubDate.innerText = book.publishedDate;
        bookImg.setAttribute('src', book.imgUrl);
        bookInformation.innerText = book.information;

}


const getPrice = async function(){
    const productId = (window.location.href).split('=')[1]
    const res = await Api.get('/api/product', productId)
    const book = res.result
    nowPrice.innerText = book.price;
    if(Number(nowPrice.textContent) >=12000){
        deliveryPrice.innerText = 0
    }else{
        deliveryPrice.innerText = 3000
    }
    if(book.price >=12000){
        totalPrice.innerText = book.price;
    }else{
        totalPrice.innerText = Number(book.price) + Number(deliveryPrice.textContent)
    }
    fixedPrice.innerText = Math.floor(Math.round((book.price)/0.9)/100)*100
}

getBookInfo();
getPrice();

//수량조절 버튼
function handleUpdateQuantity(e) {
    if (e.target.classList.contains('minus')) {
        num.stepDown()
    } else {
        num.stepUp()
    }
    const quantity = Number(num.value); //수량 값
    const price = quantity * Number(nowPrice.textContent);
    if(price >= 12000){
        deliveryPrice.innerText = 0
        totalPrice.innerText = Number(deliveryPrice.textContent) + price
    }else{
        deliveryPrice.innerText = 3000
        totalPrice.innerText = Number(deliveryPrice.textContent) +  price
    }
    
}

plus.addEventListener('click', handleUpdateQuantity)
minus.addEventListener('click', handleUpdateQuantity)

async function addToCart(){
    const productId = (window.location.href).split('=')[1]
    const obj={}
    obj._id = productId
    obj.quantity = Number(num.value)
    obj.price = Number(totalPrice.textContent)
    const localCart = JSON.parse(window.localStorage.getItem('productId'))
    if(localCart === null){
        let saveBooks = []
        saveBooks.push(obj)
        window.localStorage.setItem('productId', JSON.stringify(saveBooks))
    }else{
        localCart.push(obj)
        window.localStorage.setItem('productId', JSON.stringify(localCart))
    }
    //중복제거
    const getBooksList = JSON.parse(window.localStorage.getItem('productId'))
    console.log('책 다고름 이제 중복 제거 ㄱㄱ', getBooksList)
    const newArr = getBooksList.filter((arr,idx, callback) => idx === callback.findIndex(t => t._id === arr._id))
    window.localStorage.setItem('productId', JSON.stringify(newArr))
    console.log('중복제거됨', window.localStorage.getItem('prductId'))
    moveCart()
}

cartBtn.addEventListener('click', addToCart)


function moveCart(){
    if(confirm(`장바구니에 추가되었습니다. 장바구니로 이동하시겠습니까? `)){
        location.href = '/cart' 
    }
    
}


//바로 구매하기
const buyArr = []
async function buyNow(){
        buyBtn.addEventListener('click',function(e){
            // 해당 제품의 아이디, 가격, 수량을 로컬스토리지에 저장하고 구매페이지로 이동
            const id = (window.location.href).split('=')[1]
            const q = Number(num.value)
            const price = totalPrice.textContent
            const obj = {};
            obj._id = id
            obj.quantity = q
            obj.price = Number(price)
            buyArr.push(obj)
            window.localStorage.setItem('buyProductId', JSON.stringify(buyArr))
            window.location.href = '/oneorder'
        })
}
buyNow()







