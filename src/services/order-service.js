import { orderModel } from '../db';

class OrderService {

    constructor(orderModel) {
        this.orderModel = orderModel;
      }

    // 전체 주문 조회
    async getOrders(){
        const orders = await this.orderModel.findOrders();
        return orders;
    }

    // 주문
    async addOrder(orderInfo){
        // db에 저장
        const createdNewOrder = await this.orderModel.createOrder(orderInfo);
        return createdNewOrder;
    }
}

const orderService = new OrderService(orderModel);

export { orderService };
