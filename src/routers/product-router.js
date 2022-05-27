import { Router } from "express";
import { productController } from "../controllers/product-controller.js";
import { loginRequired } from "../middlewares";
const productRouter = Router();

productRouter.get("/:productName*?", productController.getProduct);
productRouter.post("/", loginRequired, productController.insertProduct);
productRouter.patch("/", loginRequired, productController.updateProduct);
productRouter.delete("/", loginRequired, productController.deleteProduct);
export { productRouter };
