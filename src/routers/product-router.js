import { Router } from 'express';
import { productController } from '../controllers/product-controller.js';
import { loginRequired } from '../middlewares';
const productRouter = Router();
const upload = require('../middlewares/imageUploader');

productRouter.get('/:productId*?', productController.getProduct);
productRouter.post(
  '/',
  [loginRequired, upload.single('img')],
  productController.insertProduct,
);
productRouter.patch(
  '/',
  [loginRequired, upload.single('img')],
  productController.updateProduct,
);
productRouter.delete('/', loginRequired, productController.deleteProduct);
export { productRouter };
