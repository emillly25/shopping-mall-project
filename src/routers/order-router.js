import { Router } from "express";
import * as Ordercontroller from '../controllers';
import {loginRequired } from '../middlewares';

const orderRouter = Router();

// 전체 주문 조회
orderRouter.get('/orderlist',Ordercontroller.getOrderlist);

// 상품 주문
orderRouter.post('/',loginRequired,Ordercontroller.Order);

// 상품 주문
orderRouter.get('/',loginRequired,Ordercontroller.getOrder);

// 주문 취소
orderRouter.delete('/:orderId',loginRequired,Ordercontroller.deleteOrder);

export { orderRouter };