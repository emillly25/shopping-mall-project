import * as Api from '/api.js';

const items = document.querySelector('.items');
const bookName = document.querySelector('.bookName span'); //책제목 
const bookAuthor = document.querySelector('.bookAuthor span');  //저자
const bookPrice = document.querySelector('.bookPrice span');  //판매가격
const bookInformation = document.querySelector('.bookInformation span'); //책설명
const bookImg = document.querySelector('.bookImg img');  //책사진


//json에서 데이터 받아오는 함수
const getBookInfo = async function(){
    const res = await Api.get('/api/product')
    const data = res.result
    console.log(data)
    data.map(({_id, name, price, author,information, imgUrl })=>{
        const htmlInfo = `<div class="bookList"><div class="bookCheck"><input type="checkbox"></div>
        <div class="bookImg" id="url"><a href="/bookdetail/?productId=${_id}"><img src="${imgUrl}"></a></div>
        <div class="bookInfo"> 
            <div class="bookName"><span><a href="/bookdetail/?productId=${_id}">${name}</a></span></div>
            <div class="bookAuthor"><span>${author}</span></div>
            <div class="bookPrice"><span>${price}</span></div>
            <div class=" bookInformation"><span>${information}</span></div>
        </div>
    
        <div class="bookBuy">
            <div class="buyBtn"><input id="buyBtn" type="button" value="구매하기" onClick="location.href='/order'"></div>
            <div class="cartBtn"><input data-id="${_id}" id="cartBtn" type="button" value="장바구니"></div>
        </div></div>` 
        items.innerHTML += htmlInfo 
    
    })
    const cartBtn = document.querySelectorAll('#cartBtn')
    const saveBooks = []

    cartBtn[0].addEventListener('click',(e)=>{
        const id = e.target.dataset.id
        const obj = {};
        obj._id = id
        saveBooks.push(obj)
        window.localStorage.setItem('productId', JSON.stringify(saveBooks))
    })

    cartBtn[1].addEventListener('click',(e)=>{
        const id = e.target.dataset.id
        const obj = {};
        obj._id = id
        saveBooks.push(obj)
        window.localStorage.setItem('productId', JSON.stringify(saveBooks))
    })

    cartBtn[2].addEventListener('click',(e)=>{
        const id = e.target.dataset.id
        const obj = {};
        obj._id = id
        saveBooks.push(obj)
        window.localStorage.setItem('productId', JSON.stringify(saveBooks))
    })

    cartBtn[3].addEventListener('click',(e)=>{
        const id = e.target.dataset.id
        const obj = {};
        obj._id = id
        saveBooks.push(obj)
        window.localStorage.setItem('productId', JSON.stringify(saveBooks))
    })

    cartBtn[4].addEventListener('click',(e)=>{
        const id = e.target.dataset.id
        const obj = {};
        obj._id = id
        saveBooks.push(obj)
        window.localStorage.setItem('productId', JSON.stringify(saveBooks))
    })
   
    
 
    


}




getBookInfo()















