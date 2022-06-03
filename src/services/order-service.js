import { orderModel } from '../db';
import { sendMail } from '../utils/send-mail';

class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  // 전체 주문 조회
  async getOrders() {
    const orders = await this.orderModel.findOrders();

    if (!orders) {
      throw new Error('There is no order history');
    }

    return orders;
  }

  // 상품 주문
  async addOrder(orderInfo) {
    const {
      userId,
      fullName,
      email,
      address,
      phoneNumber,
      order_data,
      price,
      request,
    } = orderInfo;

    if (
      !userId ||
      !fullName ||
      !email ||
      !address ||
      !phoneNumber ||
      !order_data ||
      price === null ||
      !request
    ) {
      throw new Error('required value is not allowed to be null');
    }

    // db에 저장
    const createdNewOrder = await this.orderModel.createOrder(orderInfo);

    if (createdNewOrder) {
      await sendMail(
        email,
        '주문 확인',
        `<h1>주문이 완료되었습니다.</h1>
        <div>
          ${fullName}님의 주문이 완료되었습니다.
        </div>
        <br>
        <div>
          <p>주문 번호 : ${createdNewOrder._id}</p>
          <p>주문 상품 : ${order_data}</p>
          <p>결제 금액 : ${price}원</p>
        </div>`,
      );
    }

    return createdNewOrder;
  }

  // 사용자 주문 목록 조회
  async getOrdersById(userId) {
    if (!userId) {
      throw new Error('required value is not allowed to be null');
    }

    const orders = await this.orderModel.findOrdersById(userId);

    if (!orders) {
      throw new Error('There is no order history');
    }

    return orders;
  }

  // 주문 취소
  async deleteOrder(userId, orderId) {
    if (!userId || !orderId) {
      throw new Error('required value is not allowed to be null');
    }

    const del_orders = await this.orderModel.deleteOrdersById(userId, orderId);

    if (!del_orders) {
      throw new Error('There is no order history to cancel');
    }

    return del_orders;
  }

  async findIdByorderId(orderId) {
    if (!orderId) {
      throw new Error('required value is not allowed to be null');
    }

    const userId = await this.orderModel.finduserId(orderId);

    if (!userId) {
      throw new Error('There is no order history');
    }

    return userId;
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
