import { model } from "mongoose";
import { ProductSchema } from "../schemas/product-schema";
const Product = model("Product", ProductSchema);

export class ProductModel {
  async findByName(name) {
    console.log(3);
    const product = await Product.findOne({ name }).populate(
      "category",
      "name"
    );
    console.log(product);
    return product;
  }
  async findAll() {
    const products = await Product.find({}).populate("category", "name");
    return products;
  }

  async create(productInfo) {
    const [
      category,
      name,
      price,
      information,
      author,
      publisher,
      publishedDate,
      orderCount,
    ] = productInfo;

    const createdNewProduct = new Product({
      category: category,
      name: name,
      price: price,
      information: information,
      author: author,
      publisher: publisher,
      publishedDate: publishedDate,
      orderCount: orderCount,
    });
    await createdNewProduct.save();
    return createdNewProduct;
  }

  async update(productInfo, productId) {
    const [
      category,
      name,
      price,
      information,
      author,
      publisher,
      publishedDate,
    ] = productInfo;

    let updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      {
        category: category,
        name: name,
        price: price,
        information: information,
        author: author,
        publisher: publisher,
        publishedDate: publishedDate,
      }
    );
    return updatedProduct;
  }
}

const productModel = new ProductModel();

export { productModel };
