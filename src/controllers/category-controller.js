const { categoryService } = require("../services/category-service");

class CategoryController {
  // 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨

  async getCategory(req, res) {
    let { categoryName } = req.params;
    try {
      let category;
      if (!categoryName) {
        category = await categoryService.getAllCategory();
      } else {
        category = await categoryService.getCategory(categoryName);
      }
      return res.json(category);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async insertCategory(req, res) {
    try {
      let result = await categoryService.insertCategory(req.body.name);
      if (result) {
        res.status(200).json({
          result,
          message: "category created",
        });
      }
      return;
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async updateCategory(req, res) {
    try {
      let result = await categoryService.updateCategory(
        req.body.currentCategoryName,
        req.body.nameToChange
      );
      res.status(200).json({
        result,
        message: "category updated",
      });
      return;
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async deleteCategory(req, res) {
    try {
      let result = await categoryService.deleteCategory(req.body.name);
      res.status(200).json({
        result,
        message: "category deleted",
      });
      return;
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

const categoryController = new CategoryController();

export { categoryController };
