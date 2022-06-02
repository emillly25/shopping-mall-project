const { categoryService } = require('../services/category-service');
import { ValueIsNullError } from '../error/value-error';

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
    const name = req.body.name;
    try {
      const addedCategory = await categoryService.addCategory(name);
      return res.status(200).json({
        isSuccess: true,
        message: 'Category inserted successfully',
        status: 202,
        result: addedCategory,
      });
    } catch (err) {
      next(err);
    }
  }

  async editCategory(req, res, next) {
    const currentCategoryName = req.body.currentCategoryName;
    const nameToChange = req.body.nameToChange;
    try {
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
    const name = req.body.name;
    try {
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
