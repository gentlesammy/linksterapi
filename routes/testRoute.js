const { check } = require("express-validator");
const verifyUser = require("../middlewares/verifyUser");
const verifyUserActivated = require("../middlewares/verifyUserActivated");
const {getAllUsers } = require("../controllers/auth");

module.exports = (app) => {
     app.get("/api/v1/testusers", verifyUser, getAllUsers);
}