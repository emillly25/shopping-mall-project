import * as Api from '/api.js';

try {
  const res = await Api.get('/api/order');
  const tableList = document.querySelector('.account-page-body');
  for (let i = 0; i < res.data.length; i++) {
    const orderDate = res.data[i].createdAt.substr(0, 10);
    console.log(res.data[i]);
    const createTr = `
        <div class="body-list body-tr">
            <div class="date">${orderDate}</div>
            <div class="product">${res.data[i].order_data} / ${res.data[i].quantity}개</div>
            <div class="state">상품 준비중</div>
            <div class="apply">
                <button class="button is-success" id="orderDeleteBtn">주문취소</button>
            </div>
        </div>`;
    tableList.insertAdjacentHTML('beforeend', createTr);
  }
} catch (err) {
  alert(err.message); // 해결사항2) 메세지 제대로 뜨는지도 확인! 제 계정의 주문 데이터 모두 삭제후 test 해보기
}

const orderDeleteBtn = document.getElementById('orderDeleteBtn');
orderDeleteBtn.addEventListener('click', async e => {
  console.log(e.target); // 해결사항1) btn 클릭하면 해당 row의 orderId가 res.data[i]._id이다. 이것을 data로 전달해줘야 함
  //   try {
  //       const data = {orderId : }
  //     const res = await Api.delete('/api/order', data);
  //     alert(res.message);
  //     console.log('삭제된 주문 데이터 : ', res.result);
  //     window.location.href = '/account/orders/orders.html';
  //   } catch (err) {
  //     alert(err.message);
  //   }
});
