import { Router } from "express";
import * as Ordercontroller from '../controllers';

const orderRouter = Router();

// 전체 주문 조회
orderRouter.get('/',Ordercontroller.getOrderlist);

// 상품 주문
orderRouter.post('/:userId',Ordercontroller.Order);

// 상품 주문
orderRouter.get('/:userId',Ordercontroller.getOrder);

export { orderRouter };