const Link = require("../../models/links");
const { validationResult } = require("express-validator");

//get all Links

const getAllLinks = async (req, res) => {
  try {
    const link = await Link.find();
    res.status(200).json({
      status: "success",
      data: link,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      data: error.message,
    });
  }
};

//get link detail
const linkDetail = async (req, res) => {
  try {
    const linkId = req.params.linkId;
    const linkDetail = await (await Link.findById(linkId)).populate();
    if (linkId) {
      return res.status(200).json({
        status: "success",
        data: linkDetail,
      });
    } else {
      return res.status(400).json({
        status: "error",
        data: "Link not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      data: error.message,
    });
  }
};
//mark a link as deleted
const deleteLink = async (req, res) => {
  try {
    const linkId = req.params.linkId;
    const linkDetail = await (await Link.findById(linkId)).populate();
    if (linkId) {
      if (linkDetail.deleted) {
        console.log("deleted");
      } else {
        console.log("Not deleted");
      }
    } else {
      return res.status(400).json({
        status: "error",
        data: "Link not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      data: error.message,
    });
  }
};

module.exports = {
  getAllLinks,
  linkDetail,
  deleteLink,
};
