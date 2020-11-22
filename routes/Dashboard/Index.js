const express = require("express");
//import all admin routes
const linkRoutes = require("./Links");
const Routes = express.Router();

// use admin routes
Routes.use(linkRoutes);

module.exports = Routes;
