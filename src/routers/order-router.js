import { Router } from "express";
import * as Ordercontroller from '../controllers';
import {loginRequired,adminRequired } from '../middlewares';

const orderRouter = Router();

// 전체 주문 조회 (관리자)
orderRouter.get('/admin/orderlist',adminRequired,Ordercontroller.getOrderlist);

// 상품 주문
orderRouter.post('/',loginRequired,Ordercontroller.Order);

// 주문 조회 (사용자)
orderRouter.get('/',loginRequired,Ordercontroller.getOrder);

// 주문 조회 (관리자)
orderRouter.get('/admin/:userId',adminRequired,Ordercontroller.getOrderByAdmin);

// 주문 취소
orderRouter.delete('/:orderId',loginRequired,Ordercontroller.deleteOrder);

// 주문 취소 (관리자)
orderRouter.delete('/admin/:orderId',adminRequired,Ordercontroller.deleteOrderByAdmin);

export { orderRouter };