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
      return res.status(500).json({
        isSuccess: false,
        message: err.message,
        status: 500,
        result: null,
      });
    }
  }

  async addCategory(req, res) {
    const name = req.body.name;
    try {
      const addedCategory = await categoryService.addCategory(
        name,
        req.currentUserId,
      );
      return res.status(200).json({
        isSuccess: true,
        message: 'Category inserted successfully',
        status: 202,
        result: addedCategory,
      });
    } catch (err) {
      if (err instanceof ValueIsNullError) {
        return res.status(400).json({
          isSuccess: false,
          message: err.message,
          status: 400,
          result: null,
        });
      }
      return res.status(500).json({
        isSuccess: false,
        message: err.message,
        status: 500,
        result: null,
      });
    }
  }

  async editCategory(req, res) {
    const currentCategoryName = req.body.currentCategoryName;
    const nameToChange = req.body.nameToChange;
    try {
      const editedCategory = await categoryService.setCategory(
        currentCategoryName,
        nameToChange,
        req.currentUserId,
      );
      return res.status(200).json({
        isSuccess: true,
        message: 'Category updated successfully',
        status: 200,
        result: editedCategory,
      });
    } catch (err) {
      if (err instanceof ValueIsNullError) {
        return res.status(400).json({
          isSuccess: false,
          message: err.message,
          status: 400,
          result: null,
        });
      }
      return res.status(500).json({
        isSuccess: false,
        message: err.message,
        status: 500,
        result: null,
      });
    }
  }

  async deleteCategory(req, res) {
    const name = req.body.name;
    try {
      const deletedCategory = await categoryService.deleteCategory(
        name,
        req.currentUserId,
      );
      return res.status(200).json({
        isSuccess: true,
        message: 'Category deleted successfully',
        status: 200,
        result: deletedCategory,
      });
    } catch (err) {
      if (err instanceof ValueIsNullError) {
        return res.status(400).json({
          isSuccess: false,
          message: err.message,
          status: 400,
          result: null,
        });
      }
      return res.status(500).json({
        isSuccess: false,
        message: err.message,
        status: 500,
        result: null,
      });
    }
  }
}

const categoryController = new CategoryController();

export { categoryController };
