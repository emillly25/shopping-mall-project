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
