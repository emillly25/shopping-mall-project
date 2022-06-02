import { Router } from 'express';
import { productController } from '../controllers/product-controller.js';
import { adminRequired } from '../middlewares';
const productRouter = Router();
const upload = require('../middlewares/imageUploader');

productRouter.get(
  '/categoryName/:name*?',
  productController.getProductsByCategoryName,
);
productRouter.get('/:productId*?', productController.getProduct);

productRouter.post(
  '/',
  [adminRequired, upload.single('img')],
  productController.addProduct,
);
productRouter.patch(
  '/',
  [adminRequired, upload.single('img')],
  productController.editProduct,
);
productRouter.delete('/', adminRequired, productController.deleteProduct);
export { productRouter };
