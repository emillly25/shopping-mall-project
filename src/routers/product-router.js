import { Router } from "express";
import { productController } from "../controllers/product-controller.js";
const productRouter = Router();

productRouter.get("/:productName*?", productController.getProduct);
productRouter.post("/", productController.insertProduct);
productRouter.patch("/", productController.updateProduct);
productRouter.delete("/", productController.deleteProduct);
export { productRouter };
