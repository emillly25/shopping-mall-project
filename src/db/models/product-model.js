import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';
const Product = model('Product', ProductSchema);

export class ProductModel {
  async findByName(name) {
    console.log(3);
    const product = await Product.findOne({ name }).populate(
      'category',
      'name',
    );
    console.log(product);
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
    await Product.deleteOne({ _id: productId });
    return;
  }
}

const productModel = new ProductModel();

export { productModel };
