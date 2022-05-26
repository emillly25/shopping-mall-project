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
}
const productService = new ProductService(productModel);

export { productService };
