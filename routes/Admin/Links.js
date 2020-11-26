const express = require("express");
const { check } = require("express-validator");
const {
  getAllLinks,
  linkDetail,
  deleteLink,
} = require("../../controllers/Admin/link");
const linkRouter = express.Router();

//all links
linkRouter.get("/links", getAllLinks);
//link detail
linkRouter.get("/links/:linkId", linkDetail);
//mark link as deleted/ false delete
linkRouter.put("/links/:linkId", deleteLink);
module.exports = linkRouter;
