import is from '@sindresorhus/is';
const { categoryService } = require('../services/category-service');

class CategoryController {
  async getCategory(req, res) {
    const { categoryName } = req.params;
    try {
      const category = await categoryService.getCategory(categoryName);
      return res.status(200).json({
        isSuccess: true,
        message: 'Category loaded successfully',
        status: 200,
        result: category,
      });
    } catch (err) {
      next(err);
    }
  }

  async addCategory(req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요',
        );
      }
      const name = req.body.name;
      const addedCategory = await categoryService.addCategory(name);
      return res.status(200).json({
        isSuccess: true,
        message: 'Category inserted successfully',
        status: 200,
        result: addedCategory,
      });
    } catch (err) {
      next(err);
    }
  }

  async editCategory(req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요',
        );
      }
      const currentCategoryName = req.body.currentCategoryName;
      const nameToChange = req.body.nameToChange;
      const editedCategory = await categoryService.setCategory(
        currentCategoryName,
        nameToChange,
      );
      return res.status(200).json({
        isSuccess: true,
        message: 'Category updated successfully',
        status: 200,
        result: editedCategory,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteCategory(req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요',
        );
      }
      const name = req.body.name;
      const deletedCategory = await categoryService.deleteCategory(name);
      return res.status(200).json({
        isSuccess: true,
        message: 'Category deleted successfully',
        status: 200,
        result: deletedCategory,
      });
    } catch (err) {
      next(err);
    }
  }
}

const categoryController = new CategoryController();

export { categoryController };
