import is from '@sindresorhus/is';
const { productService } = require('../services/product-service');

class ProductController {
  async getProduct(req, res) {
    const { productId } = req.params;

    try {
      const product = await productService.getProduct(productId);
      return res.status(200).json({
        isSuccess: true,
        message: 'Product loaded successfully',
        status: 200,
        result: product,
      });
    } catch (err) {
      next(err);
    }
  }

  async addProduct(req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요',
        );
      }
      let imgUrl = null;
      if (req.file) {
        imgUrl = req.file.location;
      }
      const addedProduct = await productService.addProduct(req.body, imgUrl);
      return res.status(200).json({
        isSuccess: true,
        message: 'Product inserted successfully',
        status: 200,
        result: addedProduct,
      });
    } catch (err) {
      next(err);
    }
  }

  async editProduct(req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요',
        );
      }
      let imgUrl = null;
      if (req.file) {
        imgUrl = req.file.location;
      }
      const editedProduct = await productService.setProduct(req.body, imgUrl);
      return res.status(200).json({
        isSuccess: true,
        message: 'Product updated successfully',
        status: 200,
        result: editedProduct,
      });
    } catch (err) {
      next(err);
    }
  }
  async deleteProduct(req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요',
        );
      }
      const productId = req.body.productId;
      const deletedProduct = await productService.deleteProduct(productId);
      return res.status(200).json({
        isSuccess: true,
        message: 'Product deleted successfully',
        status: 200,
        result: deletedProduct,
      });
    } catch (err) {
      next(err);
    }
  }
}

const productController = new ProductController();

export { productController };
