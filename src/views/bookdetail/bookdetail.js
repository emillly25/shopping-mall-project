
const minus = document.querySelector('.minus');  //minus Btn
const plus = document.querySelector('.plus');   //plus Btn
const num = document.querySelector('#num');  //input(number)

const nowPrice = document.querySelector('#nowPrice'); //현재판매가
const totalPrice = document.querySelector('#total');  //총 결제금액(span태그)
const fixedPrice = document.querySelector('#fixedPrice span'); //정가



plus.addEventListener('click', ()=>{
    num.stepUp();
    const quantity = Number(num.value); 
    const price = quantity * Number(nowPrice.textContent);
    totalPrice.innerText = price;
    

})
minus.addEventListener('click', ()=>{
    num.stepDown();
    const quantity = Number(num.value); 
    const price = quantity * Number(nowPrice.textContent);
    totalPrice.innerText = price;
})

const book_title = document.querySelector('.book_title')
const book_author = document.querySelector('.book_info #author')
const book_publish = document.querySelector('.book_info #publish')
const book_pubDate = document.querySelector('.book_info #pubDate')
const book_img = document.querySelector('.book_img img')
const book_description =  document.querySelector('#book_description')


const getBookInfo = async function(){
    const res = await fetch('../booklist/booklist.json');
    const data = await res.json();
    const  {name, author, price, information, imgUrl, publisher, publishedDate } = data;
    nowPrice.innerText = price;
    totalPrice.innerText = price;
    book_title.innerText = name;
    book_author.innerText = author;
    book_publish.innerText = publisher;
    book_pubDate.innerText = publishedDate;
    book_img.setAttribute('src', imgUrl);
    book_description .innerText = information;
    fixedPrice.innerText = Math.floor(Math.round(price/0.9)/100)*100

}

getBookInfo()












