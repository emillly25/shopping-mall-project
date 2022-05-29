const { categoryService } = require('./category-service');
const { productModel, userModel } = require('../db');
import {
  ValueIsNullError,
  CategoryDoesNotExistsError,
} from '../error/value-error';

class ProductService {
  constructor(productModel, userModel) {
    this.productModel = productModel;
    this.userModel = userModel;
  }

  async getAllProduct() {
      const product = await this.productModel.findAll();
      return product;
  }

  async getProductOne(productId) {
      const product = await this.productModel.findById(productId);
      return product;
  }

  async getProduct(productId) {
    if (!productId) {
      return await productService.getAllProduct();
    }
    return await productService.getProductOne(productId);
  }

  async insertProduct(productInfo, imgUrl, userId) {
    const categoryName = productInfo.categoryName;
    const name = productInfo.name;
    const price = productInfo.price;
    const information = productInfo.information;
    const author = productInfo.author;
    const publisher = productInfo.publisher;
    const publishedDate = productInfo.publishedDate;
    const orderCount = productInfo.orderCount;

    if (
      categoryName == null ||
      name == null ||
      price == null ||
      information == null ||
      publisher == null
    ) {
      throw new ValueIsNullError('required value is not allowed to be null');
    }

    const category = await categoryService.getCategory(categoryName);
    if (!category) {
      throw new CategoryDoesNotExistsError(
        "CategoryName doesn't exist in Category Schema",
      );
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

    await this.checkIsAdministrator(userId);
    const result = this.productModel.create(productData);
    return result;
  }

  async updateProduct(productInfo, imgUrl, userId) {
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
      productId == null ||
      categoryName == null ||
      name == null ||
      price == null ||
      information == null ||
      publisher == null
    ) {
      throw new ValueIsNullError('required value is not allowed to be null');
    }

    const category = await categoryService.getCategory(categoryName);
    if (!category) {
      throw new CategoryDoesNotExistsError(
        "CategoryName doesn't exist in Category Schema",
      );
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

    await this.checkIsAdministrator(userId);
    const result = await this.productModel.update(productData, productId);
    return result;
  }
  async deleteProduct(productId, userId) {
    await this.checkIsAdministrator(userId);
    const result = await this.productModel.delete(productId);
    return result;
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
