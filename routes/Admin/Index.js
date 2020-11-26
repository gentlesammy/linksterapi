const express = require("express");
//import all admin routes
const categoryRoutes = require("./Categories");
const userRoutes = require("./Users");
const linkRoutes = require("./Links");
const Routes = express.Router();

// use admin routes
Routes.use(categoryRoutes);
Routes.use(userRoutes);
Routes.use(linkRoutes);

module.exports = Routes;
