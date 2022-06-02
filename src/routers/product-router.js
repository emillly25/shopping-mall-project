import { Router } from 'express';
import { productController } from '../controllers/product-controller.js';
import { loginRequired } from '../middlewares';
const productRouter = Router();
const upload = require('../middlewares/imageUploader');

productRouter.get('/:productId*?', productController.getProduct);
productRouter.post(
  '/',
  [loginRequired, upload.single('img')],
  productController.addProduct,
);
productRouter.patch(
  '/',
  [loginRequired, upload.single('img')],
  productController.editProduct,
);
productRouter.delete('/', loginRequired, productController.deleteProduct);
export { productRouter };
