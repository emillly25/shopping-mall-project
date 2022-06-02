import { Router } from 'express';
import { categoryController } from '../controllers/category-controller.js';
import { loginRequired } from '../middlewares';
const categoryRouter = Router();

console.log(categoryRouter);
categoryRouter.get('/:categoryName*?', categoryController.getCategory);
categoryRouter.post('/', loginRequired, categoryController.addCategory);
categoryRouter.patch('/', loginRequired, categoryController.editCategory);

categoryRouter.delete('/', loginRequired, categoryController.deleteCategory);

export { categoryRouter };
