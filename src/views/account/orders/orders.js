import * as Api from '/api.js';

try {
  const res = await Api.get('/api/order');
  const tableList = document.querySelector('.account-page-body');
  console.log(res.result);
  if (res.result) {
    res.result.forEach(row => {
      const orderRow = `
      <div class="body-list body-tr">
        <div class="createdAt">${row.createdAt.substr(0, 10)}</div>
        <div class="fullName">${row.fullName}</div>
        <div class="email">${row.email}</div>
        <div class="phoneNumber">${row.phoneNumber}</div>
        
        <div class="order_data">${row.order_data}</div>
        <div class="price">${row.price}</div>
        <div class="request">${row.request}</div>
        <button class="cancel button is-danger is-small" data-oid = ${
          row._id
        } id="orderDeleteBtn">주문 취소</button>
        
      </div>
      `;
      tableList.insertAdjacentHTML('beforeend', orderRow);
    });
  } else {
    alert('주문 데이터가 없습니다.');
  }
} catch (err) {
  alert(err.message); // 해결사항2) 메세지 제대로 뜨는지도 확인! 제 계정의 주문 데이터 모두 삭제후 test 해보기
}

const orderDeleteBtn = document.querySelectorAll('#orderDeleteBtn');
orderDeleteBtn.forEach(btn => {
  btn.addEventListener('click', async e => {
    // alert(e.target.dataset.oid);
    if (confirm('주문 취소 하시겠습니까?')) {
      const orderId = e.target.dataset.oid;
      try {
        const data = { orderId };
        const res = await Api.delete('/api/order', data);

        alert(`${res.result.order_data} ${res.message} `);
        // console.log(res);
        // 로그인 페이지 이동
        window.location.href = '/account/orders/orders.html';
      } catch (err) {
        alert(err);
        // error 메세지 어떻게 따오지?
      }
    }
  });
});
