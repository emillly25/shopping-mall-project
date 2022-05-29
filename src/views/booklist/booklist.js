const items = document.querySelector('.items');
const bookName = document.querySelector('.bookName span'); //책제목 
const bookAuthor = document.querySelector('.bookAuthor span');  //저자
const bookPrice = document.querySelector('.bookPrice span');  //판매가격
const bookInformation = document.querySelector('.bookInformation span'); //책설명
const bookImg = document.querySelector('.bookImg img');  //책사진



//json에서 데이터 받아오는 함수
const getBookInfo = async function(){
    const res = await fetch('./booklist.json');
    const data = await res.json()
    data.map(({id, name, price, author,information, imgUrl })=>{
        items.innerHTML += `<div class="bookList"><div class="bookCheck"><input type="checkbox"></div>
        <div class="bookImg"><a href="/bookdetail"><img src="${imgUrl}"></a></div>
        <div class="bookInfo"> 
            <div class="bookName"><span><a href="/bookdetail">${name}</a></span></div>
            <div class="bookAuthor"><span>${author}</span></div>
            <div class="bookPrice"><span>${price}</span></div>
            <div class=" bookInformation"><span>${information}</span></div>
        </div>
    
        <div class="bookBuy">
            <div class="buyBtn"><input id="buyBtn" type="button" value="구매하기"  onClick="location.href='/order'"></div>
            <div class="cartBtn"><input id="cartBtn" type="button" value="장바구니" onClick="location.href='/cart'"></div>
        </div></div>` 

    })
    


    
}

getBookInfo()













