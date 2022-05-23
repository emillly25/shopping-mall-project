const CategoryService = require("../services/category-service");

exports.getCategory = async (req, res) => {
  let { categoryName } = req.params;
  try {
    let category = await CategoryService.getCategory(categoryName);
    return res.json(category);
  } catch (err) {
    return res.status(500).json(err);
  }
};
