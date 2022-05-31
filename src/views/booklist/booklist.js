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
    console.log('받아온 전체 데이터',data)
    data.map(({_id, name, price, author,information, imgUrl })=>{
        const htmlInfo = `<div class="bookList">
        <div class="bookImg" id="url"><a href="/bookdetail/?productId=${_id}"><img src="${imgUrl}"></a></div>
        <div class="bookInfo"> 
            <div class="bookName"><span><a href="/bookdetail/?productId=${_id}">${name}</a></span></div>
            <div class="bookAuthor"><span>${author}</span></div>
            <div class="bookPrice"><span id="showPrice" data-id="${_id}">${price}</span></div>
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

    async function addToCart(){
        cartBtn.forEach(el=>{
            const showPrice = document.querySelectorAll('#showPrice')
            const showPriceArr = Array.prototype.slice.call(showPrice); 
            const localCart = window.localStorage.getItem('productId');
            el.addEventListener('click',(e)=>{
                if(localCart === null){
                    const id = e.target.dataset.id
                    const price = showPriceArr.find(el=> el.dataset.id === id)
                    const obj = {};
                    obj._id = id
                    obj.quantity = 1
                    obj.price = Number(price.textContent)
                    saveBooks.push(obj)
                    window.localStorage.setItem('productId', JSON.stringify(saveBooks))
                    moveCart()
                }else{
                     // 일단 중복이고 뭐고 다 배열에 넣어서 localStorage에 저장해
                    // 다시 localStorage조회해서 중복 제거해
                    //그리고 안내창 띄워 그럼 끝.
                    const id = e.target.dataset.id
                    const price = showPriceArr.find(el=> el.dataset.id === id)
                    const obj = {};
                    obj._id = id
                    obj.quantity = 1
                    obj.price = Number(price.textContent)
                    saveBooks.push(obj)
                    const newBooks = saveBooks.concat(JSON.parse(localCart));
                    window.localStorage.setItem('productId', JSON.stringify(newBooks))
                    moveCart()
                    
                }
                 //중복제거 후 localStorage에 반영
                const getBooksList = JSON.parse(window.localStorage.getItem('productId'))
                console.log('책 다고름 이제 중복 제거 ㄱㄱ', getBooksList)
                const newArr = getBooksList.filter((arr,idx, callback) => idx === callback.findIndex(t => t._id === arr._id))
                window.localStorage.setItem('productId', JSON.stringify(newArr))
            })
        })
    }
    addToCart()


}

getBookInfo()

function moveCart(){
    if(confirm(`장바구니에 추가되었습니다. 장바구니로 이동하시겠습니까? `)){
        location.href = '/cart' 
    }
    
}















