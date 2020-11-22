const express = require("express");
const { check } = require("express-validator");
const {
  getAllCategories,
  createCategories,
  categoryDetail,
  updateCategory,
} = require("../../controllers/Admin/categories");
const categoryRouter = express.Router();

//categories routes
categoryRouter.get("/categories", getAllCategories);
categoryRouter.post(
  "/categories",
  //validation
  [
    check(
      "title",
      "Category Title must be longer than 4 characters and less than 50 characters"
    ).isLength({
      min: 5,
      max: 50,
    }),
    check(
      "description",
      "Category Description must be longer than 20 characters and less than 500 characters"
    ).isLength({
      min: 20,
      max: 500,
    }),
  ],
  createCategories
);
categoryRouter.get("/categories/:catId", categoryDetail);
categoryRouter.put("/categories/:catId", updateCategory);
module.exports = categoryRouter;
