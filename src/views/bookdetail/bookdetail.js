
const bookName = document.querySelector('.bookName')
const bookAuthor = document.querySelector('.book_info #author')
const bookPublish = document.querySelector('.book_info #publish')
const bookPubDate = document.querySelector('.book_info #pubDate')
const bookImg = document.querySelector('.bookImg img')
const bookInformation =  document.querySelector('.bookInformation')

const minus = document.querySelector('.minus');  //minus Btn
const plus = document.querySelector('.plus');   //plus Btn
const num = document.querySelector('#num');  //input(number) 수량 값

const nowPrice = document.querySelector('#nowPrice'); //현재판매가
const deliveryPrice = document.querySelector('#deliveryPrice'); //배송비
const totalPrice = document.querySelector('#total');  //총 결제금액(span태그)
const fixedPrice = document.querySelector('#fixedPrice span'); //정가


// json 데이터 불러와서 랜더링
const getBookInfo = async function(){
    const res = await fetch('../booklist/booklist.json');
    const data = await res.json();
    const book = data[1]  //index = req.params 이용해서 수정해야....
    bookName.innerText = book.name;
    bookAuthor.innerText = book.author;
    bookPublish.innerText = book.publisher;
    bookPubDate.innerText = book.publishedDate;
    bookImg.setAttribute('src', book.imgUrl);
    bookInformation.innerText = book.information;

}

// json에서 가격 데이터 받아와서 handling
const getPrice = async function(){
    const res = await fetch('../booklist/booklist.json');
    const data = await res.json();
    const book = data[1]    //index 수정해야함....
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
        totalPrice.innerText = price;
    }else{
        totalPrice.innerText = price + Number(deliveryPrice.textContent);
    }
    
}

plus.addEventListener('click', handleUpdateQuantity)
minus.addEventListener('click', handleUpdateQuantity)


















