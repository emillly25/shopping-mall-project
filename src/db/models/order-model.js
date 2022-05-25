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
      const orders = await Order.find({user_id:userId});
      return orders;
    }
}

const orderModel = new OrderModel();

export { orderModel };
