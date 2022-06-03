import * as Api from '/api.js';
const items = document.querySelector('.items');

async function booksRendering(){
    //1. DB에 있는 책 정보 가져오기
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
                <div class="qty">
                <input data-id="${_id}" class="minus" type="button" value="-">
                <input data-id="${_id}" class="num" type="number" value="1" min="1" step="1" style="width: 30px; height:30px; text-align:center;">
                <input data-id="${_id}" class="plus" type="button" value="+">
            </div>
                <div class="bookPrice"><span id="showPrice" data-id="${_id}">${price}</span></div>
                <div class=" bookInformation"><span>${information}</span></div>
            </div>
        
            <div class="bookBuy">
                <div class="buyBtn"><input data-id="${_id}" id="buyBtn" type="button" value="바로구매"></div>
                <div class="cartBtn"><input data-id="${_id}" id="cartBtn" type="button" value="장바구니"></div>
            </div></div>` 
            items.innerHTML += htmlInfo 
        })

    }
    await getBookInfo()

    //현재,, html코드가 붙여넣어진 상황!! 
    
    // 책 정보 element
    const bookName = document.querySelector('.bookName span'); //책제목 
    const bookAuthor = document.querySelector('.bookAuthor span');  //저자
    const bookPrice = document.querySelectorAll('.bookPrice span');  //판매가격
    const bookInformation = document.querySelector('.bookInformation span'); //책설명
    const bookImg = document.querySelector('.bookImg img');  //책사진
        
    //수량 조절버튼 element 
    const minus = document.querySelectorAll('.minus');  //minus Btn
    const plus =  document.querySelectorAll('.plus');   //plus Btn
    const num =  document.querySelectorAll('.num');  //input(number)

    // NodeList to Arr
    const numArr = Array.prototype.slice.call(num); 
    const bookPriceArr = Array.prototype.slice.call(bookPrice); 
    const showPriceArr = Array.prototype.slice.call(showPrice); 

    
    async function handleUpdateQuantity(e) {
        const res = await Api.get('/api/product')
        const data = res.result
        if (e.target.classList.contains('minus')){
            const id = e.target.dataset.id
            const num = numArr.find(el=> el.dataset.id === id)
            const firstPrice = data.find(el=> el._id === id).price
            const price = bookPriceArr.find(el=> el.dataset.id === id)
            num.stepDown()
            price.innerText = num.value * firstPrice
        } else {
            const id = e.target.dataset.id
            const num = numArr.find(el=> el.dataset.id === id)
            const firstPrice = data.find(el=> el._id === id).price
            const price = bookPriceArr.find(el=>el.dataset.id === id)
            num.stepUp()
            price.innerText = Number(num.value) * firstPrice
        }
    }
    
    plus.forEach(el=> el.addEventListener('click', handleUpdateQuantity))
    minus.forEach(el=> el.addEventListener('click', handleUpdateQuantity))
    

    // 장바구니에 상품 담기
    const cartBtn = document.querySelectorAll('#cartBtn')
    const saveBooks = []
    async function addToCart(){
        cartBtn.forEach(el=>{
            const showPrice = document.querySelectorAll('#showPrice')
            
            const localCart = window.localStorage.getItem('productId');
            el.addEventListener('click',(e)=>{
                if(localCart === null){
                    const id = e.target.dataset.id
                    const price = showPriceArr.find(el=> el.dataset.id === id)
                    const num = numArr.find(el=> el.dataset.id === id)
                    const obj = {};
                    obj._id = id
                    obj.quantity = num.value
                    obj.price = Number(price.textContent)
                    saveBooks.push(obj)
                    window.localStorage.setItem('productId', JSON.stringify(saveBooks))
                    moveCart()
                }else{
                    const id = e.target.dataset.id
                    const price = showPriceArr.find(el=> el.dataset.id === id)
                    const num = numArr.find(el=> el.dataset.id === id)
                    const obj = {};
                    obj._id = id
                    obj.quantity = num.value
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

    function moveCart(){
        if(confirm(`장바구니에 추가되었습니다. 장바구니로 이동하시겠습니까? `)){
            location.href = '/cart' 
        }
        
    }

    const buyBtn = document.querySelectorAll('#buyBtn')
    const buyArr = []
    //바로 구매하기
    async function buyNow(){
        buyBtn.forEach(el=>{
            el.addEventListener('click',function(e){
                // 해당 제품의 아이디, 가격, 수량을 로컬스토리지에 저장하고 구매페이지로 이동
                const id = e.target.dataset.id
                const price = showPriceArr.find(el=> el.dataset.id === id)
                const num = numArr.find(el=> el.dataset.id === id)
                const obj = {};
                obj._id = id
                obj.quantity = Number(num.value)
                obj.price = Number(price.textContent)
                buyArr.push(obj)
                window.localStorage.setItem('buyProductId', JSON.stringify(buyArr))
                window.location.href = '/oneorder'
            })

        })
    }
    buyNow()
    

}


booksRendering()



















