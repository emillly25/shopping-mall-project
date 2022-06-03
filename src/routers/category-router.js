import { Router } from 'express';
import { categoryController } from '../controllers/category-controller.js';
import { adminRequired } from '../middlewares';
const categoryRouter = Router();

console.log(categoryRouter);
categoryRouter.get('/:categoryName*?', categoryController.getCategory);
categoryRouter.post('/', adminRequired, categoryController.addCategory);
categoryRouter.patch('/', adminRequired, categoryController.editCategory);

categoryRouter.delete('/', adminRequired, categoryController.deleteCategory);

export { categoryRouter };
