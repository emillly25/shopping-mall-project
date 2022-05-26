const { productModel } = require("../db");

class ProductService {
  constructor(productModel) {
    this.productModel = productModel;
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

  async insertProduct(productInfo) {
    try {
      const result = this.productModel.create(productInfo);
      return result;
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updateProduct(productInfo, productId) {
    try {
      const result = await this.productModel.update(productInfo, productId);
      return result;
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
const productService = new ProductService(productModel);

export { productService };
