import { Router } from "express";
const categoryRouter = Router();
const CategoryController = require("../controllers/category-controller.js");

categoryRouter.get("/:categoryName", CategoryController.getCategory);

export { categoryRouter };
