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
}

const productModel = new ProductModel();

export { productModel };
