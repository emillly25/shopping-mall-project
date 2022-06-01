import * as Api from '/api.js';

try {
  const res = await Api.get('/api/order');
  const tableList = document.querySelector('.account-page-body');
  console.log(res.result);
  if (res.result) {
    for (let i = 0; i < res.result.length; i++) {
      const orderDate = res.result[i].createdAt.substr(0, 10);
      console.log(res.result);
      const createTr = `
          <div class="body-list body-tr">
              <div class="date">${orderDate}</div>
              <div class="product">${res.result[i].order_data} / ${res.result[i].quantity}개</div>
              <div class="state">상품 준비중</div>
              <div class="apply">
                  <button class="button is-success" id="orderDeleteBtn" data-pid = ${res.result[i]._id}>주문취소</button>
              </div>
          </div>`;
      tableList.insertAdjacentHTML('beforeend', createTr);
    }
  } else {
    alert('주문 데이터가 없습니다.');
  }
} catch (err) {
  alert(err.message); // 해결사항2) 메세지 제대로 뜨는지도 확인! 제 계정의 주문 데이터 모두 삭제후 test 해보기
}

const orderDeleteBtn = document.querySelectorAll('#orderDeleteBtn');
orderDeleteBtn.forEach(btn => {
  btn.addEventListener('click', async e => {
    // alert(e.target.dataset.pid);
    const orderId = e.target.dataset.pid;
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
  });
});
