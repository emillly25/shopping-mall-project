const { productService } = require('../services/product-service');

import {
  ValueIsNullError,
  CategoryDoesNotExistsError,
} from '../error/value-error';

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
      return res.status(500).json({
        isSuccess: false,
        message: err.message,
        status: 500,
        result: null,
      });
    }
  }

  async addProduct(req, res) {
    let imgUrl = null;
    if (req.file) {
      imgUrl = req.file.location;
    }
    try {
      const addedProduct = await productService.addProduct(
        req.body,
        imgUrl,
        req.currentUserId,
      );
      return res.status(200).json({
        isSuccess: true,
        message: 'Product inserted successfully',
        status: 200,
        result: addedProduct,
      });
    } catch (err) {
      if (
        err instanceof ValueIsNullError ||
        err instanceof CategoryDoesNotExistsError
      ) {
        return res.status(400).json({
          isSuccess: false,
          message: err.message,
          status: 400,
          result: null,
        });
      }
      return res.status(500).json({
        isSuccess: false,
        message: err.message,
        status: 500,
        result: null,
      });
    }
  }

  async editProduct(req, res) {
    let imgUrl = null;
    if (req.file) {
      imgUrl = req.file.location;
    }
    try {
      const editedProduct = await productService.setProduct(
        req.body,
        imgUrl,
        req.currentUserId,
      );
      return res.status(200).json({
        isSuccess: true,
        message: 'Product updated successfully',
        status: 200,
        result: editedProduct,
      });
    } catch (err) {
      if (
        err instanceof ValueIsNullError ||
        err instanceof CategoryDoesNotExistsError
      ) {
        return res.status(400).json({
          isSuccess: false,
          message: err.message,
          status: 400,
          result: null,
        });
      }
      return res.status(500).json({
        isSuccess: false,
        message: err.message,
        status: 500,
        result: null,
      });
    }
  }
  async deleteProduct(req, res) {
    const productId = req.body.productId;
    try {
      const deletedProduct = await productService.deleteProduct(
        productId,
        req.currentUserId,
      );
      return res.status(200).json({
        isSuccess: true,
        message: 'Product deleted successfully',
        status: 200,
        result: deletedProduct,
      });
    } catch (err) {
      if (err instanceof ValueIsNullError) {
        return res.status(400).json({
          isSuccess: false,
          message: err.message,
          status: 400,
          result: null,
        });
      }
      return res.status(500).json({
        isSuccess: false,
        message: err.message,
        status: 500,
        result: null,
      });
    }
  }
}

const productController = new ProductController();

export { productController };
