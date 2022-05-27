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

    async deleteOrdersById(userId,orderId){
      const orders = await Order.findOneAndDelete({user_id:userId,_id:orderId});
      return orders;
    }

    async finduserId(orderId){
      const id = await Order.find({_id:orderId});
      return id[0].user_id;
    }
}

const orderModel = new OrderModel();

export { orderModel };
