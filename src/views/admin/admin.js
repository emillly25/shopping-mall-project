import * as Api from '/api.js';

// ==================== <Category> ====================

// category create (insert)

const insert = document.querySelector('.c_insert');
const insertName = insert.querySelector('#name');
const insertBtn = insert.querySelector('#btn');

insertBtn.addEventListener('click', async () => {
  const name = insertName.value;
  try {
    const data = { name };
    console.log('data : ', data);
    const res = await Api.post('/api/category', data);

    alert(`${res.result.name} ${res.message}`);

    // 로그인 페이지 이동
    window.location.href = '/admin';
  } catch (err) {
    alert(err);
    // name is already exist 메세지 어떻게 따오지?
  }
});

// category read

const read = document.querySelector('.c_get');
const readName = read.querySelector('#name');
const readBtn = read.querySelector('#btn');

readBtn.addEventListener('click', async () => {
  const params = readName.value;
  try {
    console.log('params : ', params);
    const res = await Api.get('/api/category', params);

    if (!params && !res) alert('카테고리가 없습니다.');
    else if (params && !res) alert(`${params} 라는 카테고리는 없습니다.`);
    else alert('read 완료'); // 거기서 넘겨지는 MESSAGE 출력하기
    // console.log('res : ', res);
    // 로그인 페이지 이동
    window.location.href = '/admin';
  } catch (err) {
    alert(err);
  }
});

// category update (질문 3개)

const update = document.querySelector('.c_update');
const current = update.querySelector('#currentCategoryName');
const change = update.querySelector('#nameToChange');
const updateBtn = update.querySelector('#btn');

updateBtn.addEventListener('click', async () => {
  const currentCategoryName = current.value;
  const nameToChange = change.value;
  try {
    const data = { currentCategoryName, nameToChange };
    // console.log('data : ', data);
    const res = await Api.patch('/api/category', data);

    alert('update 완료');

    // 로그인 페이지 이동
    window.location.href = '/admin';
  } catch (err) {
    alert(err);
    // error 메세지 어떻게 따오지?
  }
});

// category delete (질문하고 해결하기)

const del = document.querySelector('.c_delete');
const deleteName = del.querySelector('#name');
const deleteBtn = del.querySelector('#btn');

deleteBtn.addEventListener('click', async () => {
  const name = deleteName.value;
  try {
    const data = { name };
    const res = await Api.delete('/api/category', data);

    alert(`${name} category deleted`);

    // 로그인 페이지 이동
    window.location.href = '/admin';
  } catch (err) {
    alert(err);
    // error 메세지 어떻게 따오지?
  }
});

// ==================== <Order> ====================

// Order create (insert)

const insertOrder = document.querySelector('.o_insert');
const currentUserId = insertOrder.querySelector('#user_id');
const fullName = insertOrder.querySelector('#fullName');
const postalCode = insertOrder.querySelector('#postalCode');
const address1 = insertOrder.querySelector('#address1');
const address2 = insertOrder.querySelector('#address2');
const phoneNumber = insertOrder.querySelector('#phoneNumber');
const order_data = insertOrder.querySelector('#order_data');
const price = insertOrder.querySelector('#price');
const quantity = insertOrder.querySelector('#quantity');
const request = insertOrder.querySelector('#request');
const insertOrderBtn = insertOrder.querySelector('#btn');

insertOrderBtn.addEventListener('click', async () => {
  try {
    const data = {
      fullName: fullName.value,
      address: {
        postalCode: postalCode.value,
        address1: address1.value,
        address2: address2.value,
      },
      phoneNumber: phoneNumber.value,
      order_data: order_data.value,
      price: price.value,
      quantity: quantity.value,
      request: request.value,
    };

    // console.log('data : ', data);
    const res = await Api.post('/api/order', data);

    alert(res.message);
    // console.log(res.data);

    // 로그인 페이지 이동
    // window.location.href = '/admin';
  } catch (err) {
    alert(err);
  }
});

// Orders read

// 유저명을 넣으면 user_id로 변환하는 부분이 필요하다
// 지금은 user_id (예를 들면 628c82fa7f591f48de1d6f74) 를 넣어야 특정 사용자의 주문 조회가 가능하다!
// elice 라는 fullName이 readOrdersName로 입력되면, elice를 628c82fa7f591f48de1d6f74로 바꿔줘야 한다.
// 지금은 backend 단에서 user_id 가 일치하는지 여부를 보고 데이터를 가져오기 때문!
// user_id가 일치하는지 여부를 보고 데이터를 가져오는 방식은 옳다! elice -> 628c82fa7f591f48de1d6f74가 자동으로 되는 부분을 만들어놨는지 여쭤보기

const readOrders = document.querySelector('.o_get');
const readOrdersName = readOrders.querySelector('#name');
const readOrdersBtn = readOrders.querySelector('#btn');

readOrdersBtn.addEventListener('click', async () => {
  const params = readOrdersName.value;
  try {
    console.log('params : ', params);
    let res;
    if (!params) res = await Api.get('/api/order/admin/orderlist', params);
    else res = await Api.get('/api/order/admin', params);

    if (!params && !res) alert('제품이 없습니다.');
    else if (params && !res) alert(`${params} 라는 제품은 없습니다.`);
    else alert('orders read 완료');

    console.log('모든 orders 데이터', res.result);
    // 로그인 페이지 이동
    // window.location.href = '/admin';
  } catch (err) {
    alert(err);
  }
});

// Orders delete (category delete 부분 문제 해결 후 한번에 같이 해결하기)

const delOrder = document.querySelector('.o_delete');
const deleteOrderName = delOrder.querySelector('#name');
const deleteOrderBtn = delOrder.querySelector('#btn');

deleteOrderBtn.addEventListener('click', async () => {
  const orderId = deleteOrderName.value;
  try {
    const data = { orderId };
    const res = await Api.delete('/api/order/admin/', data);

    alert(`${name} category deleted`);

    // 로그인 페이지 이동
    window.location.href = '/admin';
  } catch (err) {
    alert(err);
    // error 메세지 어떻게 따오지?
  }
});

// ==================== <Product> ====================

// Product create (insert)
// => 입력값 모두 넣고 submit 누르면 api.js 35번쨰 줄에서 500 Error 발생했다는 콘솔 메세지!
// 입력 데이터 형식이 잘못된 것인가...? 내일 여쭤보기

const insertProduct = document.querySelector('.p_insert');
const categoryName = insertProduct.querySelector('#categoryName');
const name = insertProduct.querySelector('#name');
const Productprice = insertProduct.querySelector('#price');

const information = insertProduct.querySelector('#information');
const author = insertProduct.querySelector('#author');
const publisher = insertProduct.querySelector('#publisher');
const publishedDate = insertProduct.querySelector('#publishedDate');
const orderCount = insertProduct.querySelector('#orderCount');
const insertProductBtn = insertProduct.querySelector('#btn');

insertProductBtn.addEventListener('click', async e => {
  const formData = new FormData(document.getElementById('testForm'));
  const fileInput = document.querySelector('#fileInput');

  // console.log('files 내부 : ', fileInput.files[0]);
  // 하드코딩
  // formData.append('img', fileInput.files[0]);
  // formData.append('categoryName', '국내도서323132');
  // formData.append('name', '책7');
  // formData.append('price', '10000');
  // formData.append('information', '정보7');
  // formData.append('author', '저자7');
  // formData.append('publisher', '퍼블리셔7');
  // formData.append('publishedDate', '2022-02-02');
  // formData.append('orderCount', '3');
  // for (var pair of formData.entries()) {
  //   console.log(pair[0] + ', ' + pair[1]);
  // }
  try {
    formData.append('img', fileInput.files[0]);
    formData.append('categoryName', categoryName.value);
    formData.append('name', name.value);
    formData.append('price', Number(Productprice.value));
    formData.append('information', information.value);
    formData.append('author', author.value);
    formData.append('publisher', publisher.value);
    formData.append('publishedDate', publishedDate.value);
    formData.append('orderCount', Number(orderCount.value));

    const res = await Api.postFormData('/api/product', formData);

    alert(res.message);
    console.log(res.data);

    // 로그인 페이지 이동
    // window.location.href = '/admin';
  } catch (err) {
    alert(err.message);
  }
});

// Product Read (get)

const readProducts = document.querySelector('.p_get');
const readProductsName = readProducts.querySelector('#name');
const readProductsBtn = readProducts.querySelector('#btn');

readProductsBtn.addEventListener('click', async () => {
  const params = readProductsName.value;
  try {
    console.log('params : ', params);
    const res = await Api.get('/api/product', params);

    if (!params && !res) alert('제품이 없습니다.');
    else if (params && !res) alert(`${params} 라는 제품은 없습니다.`);
    else alert(res.message);
    console.log('res : ', res);
    // 로그인 페이지 이동
    // window.location.href = '/admin';
  } catch (err) {
    alert(err);
  }
});

// Product update
// patchFormData

const updateProduct = document.querySelector('.p_update');
const productId = document.querySelector('#p_id');
const updateCategoryName = updateProduct.querySelector('#categoryName');
const updateName = updateProduct.querySelector('#name');
const updateProductprice = updateProduct.querySelector('#price');

const updateInformation = updateProduct.querySelector('#information');
const updateAuthor = updateProduct.querySelector('#author');
const updatePublisher = updateProduct.querySelector('#publisher');
const updatePublishedDate = updateProduct.querySelector('#publishedDate');
const updateOrderCount = updateProduct.querySelector('#orderCount');
const updateProductBtn = updateProduct.querySelector('#btn');

updateProductBtn.addEventListener('click', async e => {
  const updateFormData = new FormData(document.getElementById('updateForm'));
  const fileInput = document.querySelector('#updateFileInput');

  // console.log('files 내부 : ', fileInput.files[0]);
  // 하드코딩
  // formData.append('img', fileInput.files[0]);
  // formData.append('categoryName', '국내도서323132');
  // formData.append('name', '책7');
  // formData.append('price', '10000');
  // formData.append('information', '정보7');
  // formData.append('author', '저자7');
  // formData.append('publisher', '퍼블리셔7');
  // formData.append('publishedDate', '2022-02-02');
  // formData.append('orderCount', '3');
  // for (var pair of formData.entries()) {
  //   console.log(pair[0] + ', ' + pair[1]);
  // }
  try {
    updateFormData.append('productId', productId.value);
    updateFormData.append('img', fileInput.files[0]);
    updateFormData.append('categoryName', updateCategoryName.value);
    updateFormData.append('name', updateName.value);
    updateFormData.append('price', Number(updateProductprice.value));
    updateFormData.append('information', updateInformation.value);
    updateFormData.append('author', updateAuthor.value);
    updateFormData.append('publisher', updatePublisher.value);
    updateFormData.append('publishedDate', updatePublishedDate.value);
    updateFormData.append('orderCount', Number(updateOrderCount.value));

    const res = await Api.patchFormData('/api/product', updateFormData);

    alert(res.message);
    console.log(res.data);

    // 로그인 페이지 이동
    // window.location.href = '/admin';
  } catch (err) {
    alert(err);
  }
});

// Product delete

const delProduct = document.querySelector('.p_delete');
const deleteProductName = delProduct.querySelector('#name');
const deleteProductBtn = delProduct.querySelector('#btn');

deleteProductBtn.addEventListener('click', async () => {
  const productId = deleteProductName.value;
  if (!productId) {
    alert('삭제할 product의 id를 입력하세요');
    return;
  }
  try {
    const data = { productId };
    const res = await Api.delete('/api/product', data);

    if (res.result.deletedCount > 0) alert(res.message);
    else alert(`삭제된 데이터가 없습니다.`);

    // 로그인 페이지 이동
    // window.location.href = '/admin';
  } catch (err) {
    console.log(err);
  }
});
