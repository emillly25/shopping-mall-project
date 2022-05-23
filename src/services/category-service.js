const Category = require("../db");

exports.getCategory = async (categoryName) => {
  try {
    let category = await Category.find({ name: categoryName });
    return category;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

exports.insertCategory = async (name) => {
  try {
    console.log(name);
    if (!name) {
      throw new Error("유효한 값을 입력하세요.");
    }
    if (this.getCategory(name)) {
      throw new Error("중복된 이름입니다.");
    }

    const category = new Category({
      name: name,
    });
    const result = await category.save();
    return result;
  } catch (error) {
    console.log(error);
    next(error);
  }
};
