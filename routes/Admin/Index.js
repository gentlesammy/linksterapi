const express = require("express");
//import all admin routes
const categoryRoutes = require("./Categories");
const userRoutes = require("./Users");
const Routes = express.Router();

// use admin routes
Routes.use(categoryRoutes);
Routes.use(userRoutes);

module.exports = Routes;
