import * as Api from '/api.js';

async function booksRendering() {
  //0. 화면 랜더링 함수
async function getNovel() {
    const items = document.querySelector('.account-page-body');
    const res = await Api.get('/api/product/categoryName', '시&에세이');
    const data = res.result;
    const novel = data.filter(el => {
        return el.category.name === '시&에세이';
    });
    novel.map(({ _id, name, price, author, information, imgUrl }) => {
    const htmlInfo = `<div class="bookList">
            <div class="bookImg" id="url">
                <a href="/bookdetail/?productId=${_id}">
                    <img src="${imgUrl}">
                </a>
            </div>
            <div class="bookInfo">
                <div class="bookName">
                    <span>
                        <a href="/bookdetail/?productId=${_id}">${name}</a>
                    </span>
                </div>
                <div class="bookAuthor">
                    <span>${author}</span>
                </div>
                <div class="qty">
                    <input data-id="${_id}" class="minus" type="button" value="-">
                    <input data-id="${_id}" class="num" type="number" value="1" min="1" step="1" style="width: 30px; height:30px; text-align:center;">
                    <input data-id="${_id}" class="plus" type="button" value="+">
                </div>
                <div class="bookPrice">
                    <span id="showPrice" data-id="${_id}">${price}</span>
                </div>
                <div class=" bookInformation">
                    <span>${information}</span>
                </div>
            </div>

            <div class="bookBuy">
                <div class="buyBtn"><input data-id="${_id}" id="buyBtn" type="button" value="바로구매"></div>
                <div class="cartBtn"><input data-id="${_id}" id="cartBtn" type="button" value="장바구니"></div>
            </div>
        </div>`;
        items.innerHTML += htmlInfo;
    });
}
    //1. html 랜더링
    await getNovel();

    //2. 수량조절 버튼
    const minus = document.querySelectorAll('.minus');
    const plus = document.querySelectorAll('.plus');
    plus.forEach(el => el.addEventListener('click', handleUpdateQuantity));
    minus.forEach(el => el.addEventListener('click', handleUpdateQuantity));

  //3. 장바구니 버튼 활성화
    addToCart()


  //4. 바로구매 버튼 활성화
    buyNow();

}

//1. 수량조절버튼 함수
async function handleUpdateQuantity(e) {
    const id = e.target.dataset.id;
    const num = document.querySelectorAll('.num');
    const numArr = Array.prototype.slice.call(num);
    const q = numArr.find(el => el.dataset.id === id);
    if (e.target.classList.contains('minus')) {
        q.stepDown();
    } else {
        q.stepUp();
    }
    updateProductId(e);
}

//2. 장바구니  함수
async function addToCart() {
    const cartBtn = document.querySelectorAll('#cartBtn');
    cartBtn.forEach(el => {
        el.addEventListener('click',preventCart)
    });
}

// 2-1. 장바구니 중복담기 방지
function preventCart(e){
    const saveBooks = [];
    const localCart = window.localStorage.getItem('productId')
        const id = e.target.dataset.id
        if(localCart === null){
            const num = document.querySelectorAll('.num');
            const numArr = Array.prototype.slice.call(num);
            const bookPrice = document.querySelectorAll('.bookPrice span');
            const bookPriceArr = Array.prototype.slice.call(bookPrice);
            const q = numArr.find(el => el.dataset.id === id);
            const p = bookPriceArr.find(el => el.dataset.id === id);
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
            const num = document.querySelectorAll('.num');
            const numArr = Array.prototype.slice.call(num);
            const bookPrice = document.querySelectorAll('.bookPrice span');
            const bookPriceArr = Array.prototype.slice.call(bookPrice);
            const q = numArr.find(el => el.dataset.id === id);
            const p = bookPriceArr.find(el => el.dataset.id === id);
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


//2-2. 장바구니 이동여부 체크 함수
async function moveCart() {
    if (confirm(`장바구니에 추가되었습니다. 장바구니로 이동하시겠습니까? `)) {
        location.href = '/cart';
    }
}

//3. 바로구매 함수
async function buyNow() {
    const buyBtn = document.querySelectorAll('#buyBtn');
    const buyArr = [];
    buyBtn.forEach(el => {
        el.addEventListener('click', function (e) {
        const id = e.target.dataset.id;
        const num = document.querySelectorAll('.num');
        const numArr = Array.prototype.slice.call(num);
        const bookPrice = document.querySelectorAll('.bookPrice span');
        const bookPriceArr = Array.prototype.slice.call(bookPrice);
        const q = numArr.find(el => el.dataset.id === id);
        const p = bookPriceArr.find(el => el.dataset.id === id);
        const obj = {};
        obj._id = id;
        obj.quantity = Number(q.value);
        obj.price = Number(q.value) * Number(p.textContent);
        buyArr.push(obj);
        window.localStorage.setItem('buyProductId', JSON.stringify(buyArr));
        window.location.href = '/oneorder';
        });
    });
}

//4. localStorage의 productId 업데이트 함수
async function updateProductId(e) {
    const id = e.target.dataset.id;
    const num = document.querySelectorAll('.num');
    const numArr = Array.prototype.slice.call(num);
    const bookPrice = document.querySelectorAll('.bookPrice span');
    const bookPriceArr = Array.prototype.slice.call(bookPrice);
    const q = numArr.find(el => el.dataset.id === id);
    const p = bookPriceArr.find(el => el.dataset.id === id);
    const localItems = JSON.parse(window.localStorage.getItem('productId'));
    if (localItems === null) {
        return;
    } else {
        const idx = localItems.findIndex(el => el._id === id);
        localItems[idx].quantity = Number(q.value);
        localItems[idx].price = Number(q.value) * Number(p.textContent);
        window.localStorage.setItem('productId', JSON.stringify(localItems));
    }
}

//전체 랜더링 실행함수
booksRendering();



