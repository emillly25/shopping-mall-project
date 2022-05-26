import { Router } from "express";
import { categoryController } from "../controllers/category-controller.js";
import { loginRequired } from "../middlewares";
const categoryRouter = Router();

console.log(categoryRouter);
categoryRouter.get("/:categoryName*?", categoryController.getCategory);
categoryRouter.post("/:userId", loginRequired, categoryController.insertCategory);
categoryRouter.patch("/:userId", loginRequired, categoryController.updateCategory);
categoryRouter.delete("/:userId", loginRequired, categoryController.deleteCategory);

export { categoryRouter };
