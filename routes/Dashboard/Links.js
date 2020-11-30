const express = require("express");
const { check } = require("express-validator");
const linkRoutes = express.Router();
const {
  getAllLinks,
  createLink,
  linkDetail,
  deleteLink,
  updateLink,
} = require("../../controllers/Dashboard/link");

//get all links
linkRoutes.get("/links", getAllLinks);
//create link
linkRoutes.post(
  "/links",
  //validation
  [
    check(
      "title",
      "Link Title must be longer than 4 characters and less than 50 characters"
    )
      .isLength({
        min: 5,
        max: 50,
      })
      .trim(),
    check("href", "A valid url is required").isURL().trim(),
    check(
      "description",
      "Category Description must be longer than 20 characters and less than 500 characters"
    ).isLength({
      min: 20,
      max: 500,
    }),
    check("category", "Category Id is required").isLength({
      min: 5,
    }),
  ],

  createLink
);
//get specific link
linkRoutes.get("/links/:linkId", linkDetail);
//update link
linkRoutes.put("/links/:linkId", updateLink);
//delete link
linkRoutes.delete("/links/:linkId", deleteLink);
module.exports = linkRoutes;
