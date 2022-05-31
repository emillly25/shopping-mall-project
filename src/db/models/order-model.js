import { model } from 'mongoose';
import { OrderSchema } from "../schemas/order-schema";

const Order = model('order', OrderSchema);

export class OrderModel {
    async findOrders() {
        const orders = await Order.find({});
        return orders;
      }

    async createOrder(orderInfo){
        const createdNewOrder = await Order.create(orderInfo);
        return createdNewOrder;
    }

    async findOrdersById(userId){
      const orders = await Order.find({userId});
      return orders;
    }

    async deleteOrdersById(userId,orderId){
      const orders = await Order.findOneAndDelete({userId,_id:orderId});
      return orders;
    }

    async finduserId(orderId){
      const id = await Order.find({_id:orderId});
      return id[0].userId;
    }
}

const orderModel = new OrderModel();

export { orderModel };
