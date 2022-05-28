const mongoose = require('mongoose');
const { categoryModel, userModel } = require('../db');

class CategoryService {
  constructor(categoryModel, userModel) {
    this.categoryModel = categoryModel;
    this.userModel = userModel;
  }

  async getAllCategory() {
    try {
      const category = await this.categoryModel.findAll();
      return category;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
  async getCategory(name) {
    try {
      const category = await this.categoryModel.findByName(name);
      return category;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  async insertCategory(name, userId) {
    try {
      const isExist = await this.categoryModel.findByName(name);
      if (isExist) {
        throw new Error('name is already exist.');
      }
      await this.checkIsAdministrator(userId);

      const result = this.categoryModel.create(name);
      return result;
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updateCategory(currentCategoryName, nameToChange, userId) {
    try {
      this.checkIsAdministrator(userId);

      const result = await this.categoryModel.update(
        currentCategoryName,
        nameToChange,
      );
      return result;
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async deleteCategory(name, userId) {
    try {
      this.checkIsAdministrator(userId);
      await this.categoryModel.delete(name);
      return;
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async checkIsAdministrator(userId) {
    const ObjectId = require('mongodb').ObjectId;
    const user = await this.userModel.findById(ObjectId(userId));
    if (user.role !== 'admin') {
      throw new Error('Request is not allowed. The user is not administrator.');
    }
  }
}

const categoryService = new CategoryService(categoryModel, userModel);

export { categoryService };
