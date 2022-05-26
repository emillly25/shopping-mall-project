import { Router } from "express";
import { productController } from "../controllers/product-controller.js";
const productRouter = Router();

console.log(productRouter);
productRouter.get("/:productName*?", productController.getProduct);
export { productRouter };
