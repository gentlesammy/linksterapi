const express = require("express");
const userRouter = express.Router();
const { check } = require("express-validator");
const {
  getAllUsers,
  getUserDetail,
  creditUserAccount,
  userDiscipline,
} = require("../../controllers/Admin/user");

//get all users
userRouter.get("/users", getAllUsers);
//get specific user
userRouter.get("/users/:userId", getUserDetail);
//credit a user
userRouter.post(
  "/users/credit",
  [
    check("userId", "User Id for credit recipients is required")
      .isString()
      .isLength({
        max: 25,
      }),
    check("creditUnit", "credit unit is required, maximum of 10 unit at a time")
      .isNumeric("Only numbers are allowed")
      .isLength({
        max: 10,
      }),
  ],
  creditUserAccount
);
module.exports = userRouter;
