const User = require("../models/user");
const {validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {SECRET:secret} = require("../config/index");
//signup function
const signUp = async (req, res) => {
  //check for validation error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      data: errors,
    });
  }
  //get inputs
  const { username, email, password } = req.body;
  try {
    //check if user already exist
    let user = await User.findOne({
      email,
    });
    //user exist
    if (user) {
      return res.status(400).json({
        status: "error",
        data: { message: "User Already Exists" },
      });
    }
    //username in use already
      const usernamePicked = await User.findOne({ username: req.body.username });
  if (usernamePicked) {
    return res.status(400).send({
      status: "error",
      data: { message: "username already selected, choose another one" },
    });
  }
    //user does not exist so create one
    user = new User({
      username,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    return res.status(200).json({
      status: "success",
      data: { message: "You registered successfully" },
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      data: errors,
    });
  }
};

//signIn function
const signIn = async (req, res) => {
    //check for validation error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      data: errors,
    });
  }
  const { email, password } = req.body;
  const correctUser = await User.findOne({ email });
  if (correctUser) {
    const { email, password, _id, role, username } = correctUser;
    let isMatch = await bcrypt.compareSync(req.body.password, password);
    if (isMatch) {
      //user logged in, send payload to frontend
      let token = jwt.sign(
        {
          _id,
          role,
          username,
          email,
        },
        secret,
        { expiresIn: "20h" }
      );
      let data = {
        username,
        role,
        email,
        token: `Bearer ${token}`,
        expires: 24,
      };

      res.status(200).send({
        status: "success",
        data: { message: "You are logged in", data },
      });
    } else {
      res.status(400).send({
        status: "error",
        data: { message: "Invalid login credentials" },
      });
    }
  } else {
    //incorrect email settled
    res.status(400).send({
      status: "error",
      data: { message: "Invalid login credentials" },
    });
  }

};


const getAllUsers = async(req, res) => {
 const users = await User.find(); 
   res.status(200).send({
        status: "success",
        data: users,
      });
}

module.exports = {
  signUp,
  signIn,
  getAllUsers,
};
