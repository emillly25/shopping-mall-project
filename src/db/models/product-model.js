import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';
const Product = model('Product', ProductSchema);

export class ProductModel {
  async findById(productId) {
    const product = await Product.findOne({ _id: productId }).populate(
      'category',
      'name',
    );
    return product;
  }
  async findAll() {
    const products = await Product.find({}).populate('category', 'name');
    return products;
  }
  async create(productInfo) {
    const [
      category,
      name,
      price,
      imgUrl,
      information,
      author,
      publisher,
      publishedDate,
      orderCount,
    ] = productInfo;

    const createdProduct = new Product({
      category: category,
      name: name,
      price: price,
      imgUrl: imgUrl,
      information: information,
      author: author,
      publisher: publisher,
      publishedDate: publishedDate,
      orderCount: orderCount,
    });
    await createdProduct.save();
    return createdProduct;
  }

  async update(productInfo, productId) {
    const [
      category,
      name,
      price,
      imgUrl,
      information,
      author,
      publisher,
      publishedDate,
      orderCount,
    ] = productInfo;

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      {
        category: category,
        name: name,
        price: price,
        imgUrl: imgUrl,
        information: information,
        author: author,
        publisher: publisher,
        publishedDate: publishedDate,
        orderCount: orderCount,
      },
    );
    return updatedProduct;
  }

  async delete(productId) {
    const deletedProduct = await Product.deleteOne({ _id: productId });
    return deletedProduct;
  }

  async deleteMany(category) {
    const deletedProduct = await Product.deleteMany({ category: category });
    return deletedProduct;
  }
}

const productModel = new ProductModel();

export { productModel };
