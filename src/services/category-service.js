import { ValueIsNullError, RoleIsNotAdminError } from '../error/value-error';
const { categoryModel, userModel } = require('../db');

class CategoryService {
  constructor(categoryModel, userModel) {
    this.categoryModel = categoryModel;
    this.userModel = userModel;
  }

  async getAllCategory() {
    return await this.categoryModel.findAll();
  }
  async getCategoryOne(name) {
    return await this.categoryModel.findByName(name);
  }

  async getCategory(name) {
    if (!name) {
      return this.getAllCategory();
    }
    return this.getCategoryOne(name);
  }

  async addCategory(name) {
    const isExist = await this.categoryModel.findByName(name);
    if (isExist) {
      throw new Error('name is already exist.');
    }

    if (name == null) {
      throw new ValueIsNullError('required value is not allowed to be null');
    }

    const result = this.categoryModel.create(name);
    return result;
  }

  async setCategory(currentCategoryName, nameToChange) {
    if (currentCategoryName == null || nameToChange == null) {
      throw new ValueIsNullError('required value is not allowed to be null');
    }

    const result = await this.categoryModel.update(
      currentCategoryName,
      nameToChange,
    );
    return result;
  }

  async deleteCategory(name) {
    if (name == null) {
      throw new ValueIsNullError('required value is not allowed to be null');
    }

    return await this.categoryModel.delete(name);
  }
}

const categoryService = new CategoryService(categoryModel, userModel);

export { categoryService };
