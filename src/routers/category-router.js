import { Router } from "express";
const categoryRouter = Router();
const CategoryController = require("../controllers/category-controller.js");

categoryRouter.get("/:categoryName", CategoryController.getCategory);
categoryRouter.post("/", CategoryController.insertCategory);
categoryRouter.post("/change-category-name", CategoryController.updateCategory);
categoryRouter.post("/delete-category", CategoryController.deleteCategory);

export { categoryRouter };
