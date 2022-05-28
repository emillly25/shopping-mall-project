const { productModel, userModel } = require('../db');

class ProductService {
  constructor(productModel, userModel) {
    this.productModel = productModel;
    this.userModel = userModel;
  }

  async getAllProduct() {
    try {
      const product = await this.productModel.findAll();
      return product;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  async getProduct(name) {
    try {
      const product = await this.productModel.findByName(name);
      return product;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  async insertProduct(productInfo, userId) {
    try {
    
      await this.checkIsAdministrator(userId);
      const result = this.productModel.create(productInfo);
      return result;
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updateProduct(productInfo, productId, userId) {
    try {
      await this.checkIsAdministrator(userId);
      const result = await this.productModel.update(productInfo, productId);
      return result;
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async deleteProduct(productId, userId) {
    try {
      await this.checkIsAdministrator(userId);
      const result = await this.productModel.delete(productId);
      return result;
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async checkIsAdministrator(userId) {
    const ObjectId = require('mongodb').ObjectId;
    const user = await this.userModel.findById(ObjectId(userId));
    if (user.role !== 'admin') {
      throw new Error('Request is not allowed. The user is not administrator.');
    }
  }
}
const productService = new ProductService(productModel, userModel);

export { productService };
