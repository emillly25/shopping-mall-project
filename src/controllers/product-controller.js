const { productService } = require("../services/product-service");
const { categoryService } = require("../services/category-service");

class ProductController {
  async getProduct(req, res) {
    let { productName } = req.params;

    try {
      let product;
      if (!productName) {
        product = await productService.getAllProduct();
      } else {
        product = await productService.getProduct(productName);
      }
      return res.json(product);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

const productController = new ProductController();

export { productController };
