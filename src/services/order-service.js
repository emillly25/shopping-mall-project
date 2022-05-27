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

    // 상품 주문
    async addOrder(orderInfo){
        // db에 저장
        const createdNewOrder = await this.orderModel.createOrder(orderInfo);
        return createdNewOrder;
    }

     // 사용자 주문 목록 조회
     async getOrdersById(userId){
        const orders = await this.orderModel.findOrdersById(userId);
        return orders;
    }

    // 주문 취소
    async deleteOrder(userId,orderId){
        const del_orders = await this.orderModel.deleteOrdersById(userId,orderId);
        return del_orders;
    }

    async findIdByorderId(orderId){
        const userId = await this.orderModel.finduserId(orderId);
        return userId;
    }
    
}

const orderService = new OrderService(orderModel);

export { orderService };
