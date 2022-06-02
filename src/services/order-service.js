import { orderModel } from '../db';
import nodemailer from 'nodemailer';

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
      !price ||
      !request
    ) {
      throw new Error('required value is not allowed to be null');
    }

    // db에 저장
    const createdNewOrder = await this.orderModel.createOrder(orderInfo);

    if (createdNewOrder) {
      // 전송 옵션 설정
      const transporter = nodemailer.createTransport({
        service: 'Gmail', // 이메일
        auth: {
          user: process.env.MAIL_ID, // 발송자 이메일
          pass: process.env.MAIL_PASSWORD, // 발송자 비밀번호
        },
      });

      let data = '';
      for (let i = 0; i < order_data.length; i++) {
        data += order_data[i] + '개';
        if (i != order_data.length - 1) data += ', ';
      }

      const mailOptions = {
        from: process.env.MAIL_ID,
        to: email,
        subject: '주문 확인',
        html: `<h1>주문이 완료되었습니다.</h1>
                        <div>
                          ${fullName}님의 주문이 완료되었습니다.
                        </div>
                        <br>
                        <div>
                          <p>주문 번호 : ${createdNewOrder._id}</p>
                          <p>주문 상품 : ${data}</p>
                          <p>결제금액 : ${price}원</p>
                        </div>`,
        text: '확인 메일입니다.',
      };

      // 메일 전송하기
      const info = await transporter.sendMail(mailOptions);
      console.log(info);
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
