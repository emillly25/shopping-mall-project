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

exports.insertCategory = async (req, res) => {
  try {
    let result = await CategoryService.insertCategory(req.body.name);
    if (result) {
      res.status(200).json({
        result,
        message: "category saved",
      });
    }
    return;
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    let result = await CategoryService.updateCategory(
      req.body.currentCategoryName,
      req.body.categoryName
    );
    res.status(200).json({
      result,
      message: "category updated",
    });
    return;
  } catch (err) {
    return res.status(500).json(err);
  }
};
