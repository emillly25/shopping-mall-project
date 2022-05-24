const { categoryModel } = require("../db");

class CategoryService {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
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

  async insertCategory(name) {
    try {
      const isExist = await this.categoryModel.findByName(name);
      if (isExist) {
        throw new Error("name is already exist.");
      }

      const result = this.categoryModel.create(name);
      return result;
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updateCategory(currentCategoryName, nameToChange) {
    try {
      const result = await this.categoryModel.update(
        currentCategoryName,
        nameToChange
      );
      return result;
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async deleteCategory(name) {
    try {
      await this.categoryModel.delete(name);
      return;
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

const categoryService = new CategoryService(categoryModel);

export { categoryService };
