const { categoryService } = require('./category-service');
const { productModel } = require('../db');

class ProductService {
  constructor(productModel) {
    this.productModel = productModel;
  }

  async getAllProduct() {
    const product = await this.productModel.findAll();
    return product;
  }

  async getProductOne(productId) {
    const product = await this.productModel.findById(productId);
    return product;
  }

  async getProductsByCategoryName(categoryName) {
    if (!categoryName) {
      throw new Error('required value is not allowed to be null');
    }
    const category = await categoryService.getCategory(categoryName);
    if (!category) {
      throw new Error("CategoryName doesn't exist in Category Schema");
    }
    const products = await this.productModel.findByCategory(category);
    return products;
  }

  async getProduct(productId) {
    if (!productId) {
      return await productService.getAllProduct();
    }
    return await productService.getProductOne(productId);
  }

  async addProduct(productInfo, imgUrl) {
    const categoryName = productInfo.categoryName;
    const name = productInfo.name;
    const price = productInfo.price;
    const information = productInfo.information;
    const author = productInfo.author;
    const publisher = productInfo.publisher;
    const publishedDate = productInfo.publishedDate;
    const orderCount = productInfo.orderCount;

    if (!categoryName || !name || !price || !information || !publisher) {
      throw new Error('required value is not allowed to be null');
    }

    const category = await categoryService.getCategory(categoryName);
    if (!category) {
      throw new Error("CategoryName doesn't exist in Category Schema");
    }

    const productData = [
      category,
      name,
      price,
      imgUrl,
      information,
      author,
      publisher,
      publishedDate,
      orderCount,
    ];

    const result = this.productModel.create(productData);
    return result;
  }

  async setProduct(productInfo, imgUrl) {
    const productId = productInfo.productId;
    const categoryName = productInfo.categoryName;
    const name = productInfo.name;
    const price = productInfo.price;
    const information = productInfo.information;
    const author = productInfo.author;
    const publisher = productInfo.publisher;
    const publishedDate = productInfo.publishedDate;
    const orderCount = productInfo.orderCount;

    if (
      !productId ||
      !categoryName ||
      !name ||
      !price ||
      !information ||
      !publisher
    ) {
      throw new Error('required value is not allowed to be null');
    }

    const category = await categoryService.getCategory(categoryName);
    if (!category) {
      throw new Error("CategoryName doesn't exist in Category Schema");
    }

    const productData = [
      category,
      name,
      price,
      imgUrl,
      information,
      author,
      publisher,
      publishedDate,
      orderCount,
    ];

    const result = await this.productModel.update(productData, productId);
    return result;
  }
  async deleteProduct(productId) {
    const result = await this.productModel.delete(productId);
    return result;
  }
}
const productService = new ProductService(productModel);

export { productService };
f=