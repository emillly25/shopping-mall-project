import { Router } from "express";
import { categoryController } from "../controllers/category-controller.js";
const categoryRouter = Router();

console.log(categoryRouter);
categoryRouter.get("/:categoryName*?", categoryController.getCategory);
categoryRouter.post("/", categoryController.insertCategory);
categoryRouter.patch("/", categoryController.updateCategory);
categoryRouter.delete("/", categoryController.deleteCategory);

export { categoryRouter };
