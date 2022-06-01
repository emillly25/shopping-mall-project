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

  async insertCategory(name, userId) {
    const isExist = await this.categoryModel.findByName(name);
    if (isExist) {
      throw new Error('name is already exist.');
    }
    if (name == null) {
      throw new ValueIsNullError('required value is not allowed to be null');
    }

    await this.checkIsAdministrator(userId);
    const result = this.categoryModel.create(name);
    return result;
  }

  async updateCategory(currentCategoryName, nameToChange, userId) {
    if (currentCategoryName == null || nameToChange == null) {
      throw new ValueIsNullError('required value is not allowed to be null');
    }
    this.checkIsAdministrator(userId);
    const result = await this.categoryModel.update(
      currentCategoryName,
      nameToChange,
    );
    return result;
  }

  async deleteCategory(name, userId) {
    if (name == null) {
      throw new ValueIsNullError('required value is not allowed to be null');
    }
    this.checkIsAdministrator(userId);
    return await this.categoryModel.delete(name);
  }

  async checkIsAdministrator(userId) {
    const ObjectId = require('mongodb').ObjectId;
    const user = await this.userModel.findById(ObjectId(userId));
    if (user.role !== 'admin') {
      throw new RoleIsNotAdminError(
        'Request is not allowed. The user is not administrator.',
      );
    }
  }
}

const categoryService = new CategoryService(categoryModel, userModel);

export { categoryService };
