import { Router } from 'express';
import { categoryController } from '../controllers/category-controller.js';
import { loginRequired } from '../middlewares';
const categoryRouter = Router();

console.log(categoryRouter);
categoryRouter.get('/:categoryName*?', categoryController.getCategory);
categoryRouter.post('/', loginRequired, categoryController.insertCategory);
categoryRouter.patch('/', loginRequired, categoryController.updateCategory);
categoryRouter.delete('/', loginRequired, categoryController.deleteCategory);

export { categoryRouter };
