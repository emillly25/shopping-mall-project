const { productService } = require('../services/product-service');
const { categoryService } = require('../services/category-service');

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
  // upload.single('img');
  // const imgUrl = `https://eliceteam7-s3-bucket.s3.ap-northeast-2.amazonaws.com/archive/${req.file.filename}`;
  // console.log(imgUrl);
  async insertProduct(req, res) {
    try {
      const categoryName = req.body.categoryName;
      const name = req.body.name;
      const price = req.body.price;
      const imgUrl = req.file.location;
      const information = req.body.information;
      const author = req.body.author;
      const publisher = req.body.publisher;
      const publishedDate = req.body.publishedDate;
      const orderCount = req.body.orderCount;

      const category = await categoryService.getCategory(categoryName);
      if (!category) {
        throw new Error("CategoryName doesn't exist in Category Schema");
      }

      const productInfo = [
        category._id,
        name,
        price,
        imgUrl,
        information,
        author,
        publisher,
        publishedDate,
        orderCount,
      ];

      const result = await productService.insertProduct(
        productInfo,
        req.currentUserId,
      );
      if (result) {
        res.status(200).json({
          result,
          message: 'Product created',
        });
      }
      return;
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async updateProduct(req, res) {
    try {
      const productId = req.body.productId;

      const categoryName = req.body.categoryName;
      const name = req.body.name;
      const price = req.body.price;
      const imgUrl = req.file.location;
      const information = req.body.information;
      const author = req.body.author;
      const publisher = req.body.publisher;
      const publishedDate = req.body.publishedDate;

      const category = await categoryService.getCategory(categoryName);
      if (!category) {
        throw new Error("CategoryName doesn't exist in Category Schema");
      }

      const productInfo = [
        category._id,
        name,
        price,
        imgUrl,
        information,
        author,
        publisher,
        publishedDate,
      ];

      const result = await productService.updateProduct(
        productInfo,
        productId,
        req.currentUserId,
      );
      res.status(200).json({
        result,
        message: 'product updated',
      });
      return;
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async deleteProduct(req, res) {
    try {
      const result = await productService.deleteProduct(
        req.body.productId,
        req.currentUserId,
      );
      res.status(200).json({
        result,
        message: 'product deleted',
      });
      return;
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

const productController = new ProductController();

export { productController };
