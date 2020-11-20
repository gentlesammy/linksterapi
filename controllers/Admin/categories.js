const Category = require("../../models/categories");
const { validationResult } = require("express-validator");
//fetch all categories
const getAllCategories = async (req, res) => {
  try {
    const cat = await Category.find();
    res.status(200).json({
      status: "success",
      data: cat,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      data: error.message,
    });
  }
};

//create category
const createCategories = async (req, res) => {
  //check for validation error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      data: errors,
    });
  }

  try {
    const { title, description } = req.body;
    // check if it exist
    const titleExist = await Category.findOne({ title });
    if (titleExist != null) {
      return res.status(403).json({
        status: "error",
        data: "Category Title exist",
      });
    }
    const createCategory = await Category.create({ title, description });
    if (createCategory) {
      res.status(200).json({
        status: "success",
        data: createCategory,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      data: error.message,
    });
  }
};

//categoryDetail
const categoryDetail = async (req, res) => {
  try {
    const catId = req.params.catId;
    const categoryDetail = await Category.findById(catId);
    if (categoryDetail) {
      return res.status(200).json({
        status: "success",
        data: categoryDetail,
      });
    } else {
      return res.status(400).json({
        status: "error",
        data: "Category not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      data: error.message,
    });
  }
};

//updateCategory
const updateCategory = async (req, res) => {
  try {
    const catId = req.params.catId;
    const categoryDetail = await Category.findById(catId);
    if (categoryDetail) {
      //target exist, modify it
      const updatedCat = await Category.findByIdAndUpdate(
        catId,
        { $set: req.body },
        { new: true }
      );
      res.setHeader("Content-Type", "application/json");
      res.status(200).json({
        status: "success",
        data: updatedCat,
      });
    } else {
      return res.status(400).json({
        status: "error",
        data: "Category not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      data: error.message,
    });
  }
};

module.exports = {
  getAllCategories,
  createCategories,
  categoryDetail,
  updateCategory,
};
