const User = require("../../models/user");
const { validationResult } = require("express-validator");

//get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } });
    //map out password from list of things to send to admin
    const userSet = users.map((user) => {
      return userPrivateData(user);
    });
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({
      status: "success",
      data: userSet,
    });
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({
      status: "error",
      message:
        "There is an unresolved error from our end. Please be patient while we resolve it",
    });
  }
};

//get user detail
const getUserDetail = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (user != null) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json({
        status: "success",
        data: userPrivateData(user),
      });
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(404).json({
        status: "error",
        message: "User with such Id does not exist",
      });
    }
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

//credit user
const creditUserAccount = async (req, res) => {
  //check for validation error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      data: errors,
    });
  }
  try {
    var { userId, creditUnit } = req.body;
    //a user cannot credit himself
    if (req.user._id == userId) {
      return res.status(403).json({
        status: "error",
        data: { message: "you cannot credit yourself" },
      });
    }
    var creditUnit = parseInt(creditUnit);
    const user = await User.findById(userId);
    if (user != null) {
      user.credit = user.credit + creditUnit;
      await user.save();
      const userdet = await User.findById(userId);
      const data = { credit: user.credit, userData: userPrivateData(userdet) };
      res.setHeader("Content-Type", "application/json");
      res.status(200).json({
        status: "success",
        data,
      });
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(404).json({
        status: "error",
        message: "User with such Id does not exist",
      });
    }
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// un*block/un*suspend/de*activate user
const userDiscipline = async (req, res) => {};

// //get user Payment Hist
// const userPaymentHistory = async (req, res) => {};

//util functions
const userPrivateData = (user) => {
  return {
    user_id: user._id,
    username: user.username,
    email: user.email,
    position: user.role,
    credit: user.credit,
    paymentHistory: user.paymentHistory,
    blocked: user.blocked ? "True" : "False",
    suspended: user.suspended ? "True" : "False",
    confirmed: user.activated ? "True" : "False",
    dateJoined: user.createdAt,
  };
};

module.exports = {
  getAllUsers,
  getUserDetail,
  creditUserAccount,
  userDiscipline,
};
