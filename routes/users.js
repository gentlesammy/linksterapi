const { signUp, signIn, getAllUsers } = require("../controllers/auth");
const { check } = require("express-validator");
const verifyUser = require("../middlewares/verifyUser");
const verifyAdmin = require("../middlewares/verifyAdmin");
module.exports = (app) => {
  app.post(
    "/api/v1/signup",
    //validation
    [
      check("username", "Please Enter a Valid Username").not().isEmpty(),
      check("email", "Please enter a valid email").isEmail(),
      check("password", "Please enter a valid password").isLength({
        min: 6,
      }),
    ],
    signUp
  );
  app.post("/api/v1/signin", 
      //validation
    [
      check("email", "Please enter a valid email").isEmail(),
      check("password", "Please enter a valid password").isLength({
        min: 6,
      }),
    ],
  signIn);

  app.get("/api/v1/users", verifyUser, verifyAdmin, getAllUsers);

  //end of router
};
