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

  async insertProduct(req, res) {
    try {
      let categoryName = req.body.categoryName;
      let name = req.body.name;
      let price = req.body.price;
      let information = req.body.information;
      let author = req.body.author;
      let publisher = req.body.publisher;
      let publishedDate = req.body.publishedDate;
      let orderCount = req.body.orderCount;

      const category = await categoryService.getCategory(categoryName);
      if (!category) {
        throw new Error("CategoryName doesn't exist in Category Schema");
      }

      const productInfo = [
        category._id,
        name,
        price,
        information,
        author,
        publisher,
        publishedDate,
        orderCount,
      ];

      let result = await productService.insertProduct(productInfo);
      if (result) {
        res.status(200).json({
          result,
          message: "Product created",
        });
      }
      return;
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async updateProduct(req, res) {
    try {
      let productId = req.body.productId;

      let categoryName = req.body.categoryName;
      let name = req.body.name;
      let price = req.body.price;
      let information = req.body.information;
      let author = req.body.author;
      let publisher = req.body.publisher;
      let publishedDate = req.body.publishedDate;

      const category = await categoryService.getCategory(categoryName);
      if (!category) {
        throw new Error("CategoryName doesn't exist in Category Schema");
      }

      const productInfo = [
        category._id,
        name,
        price,
        information,
        author,
        publisher,
        publishedDate,
      ];

      let result = await productService.updateProduct(productInfo, productId);
      res.status(200).json({
        result,
        message: "product updated",
      });
      return;
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async deleteProduct(req, res) {
    try {
      let result = await productService.deleteProduct(req.body.productId);
      res.status(200).json({
        result,
        message: "product deleted",
      });
      return;
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

const productController = new ProductController();

export { productController };
