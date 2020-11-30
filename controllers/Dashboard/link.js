const Link = require("../../models/links");
const { validationResult } = require("express-validator");
const { findByIdAndDelete } = require("../../models/links");

//get all Links

const getAllLinks = async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user._id }).populate({
      path: "category",
      select: "title",
    });
    res.status(200).json({
      status: "success",
      data: links,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      data: error.message,
    });
  }
};

//create link
const createLink = async (req, res) => {
  try {
    //check for validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        data: errors,
      });
    }
    const { title, href, description, category } = req.body;
    const owner = req.user._id;
    //TODO:check if user has such title already
    const createLink = await Link.create({
      title,
      description,
      href,
      category,
      owner,
    });
    if (createLink) {
      // console.log(createLink._id);
      const updatedLink = await Link.findOne().populate({
        path: "category",
        select: "title",
      });
      res.status(200).json({
        status: "success",
        data: updatedLink,
      });
    }
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({
      status: "error",
      data: { message: error.message },
    });
  }
};

//get link detail
const linkDetail = async (req, res) => {
  try {
    const linkId = req.params.linkId;
    const linkDetail = await Link.findById(linkId).populate({
      path: "category",
      select: "title",
    });
    if (linkId && linkId != null) {
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

//update link info
const updateLink = async (req, res) => {
  //TODO: validate link if present in what is set
  try {
    const linkId = req.params.linkId;
    ("");
    const link = await Link.findById(linkId);
    if (link) {
      //check if owner owns link
      if (String(link.owner) !== String(req.user._id)) {
        //unauthorised owner
        console.log({ owner: link.owner, user: req.user.id, link });
        console.log("you do not own this");
        res.setHeader("Content-Type", "application/json");
        res.status(403).json({
          status: "error",
          data: { message: "You do not own this link" },
        });
      } else {
        //delete
        const updatedLink = await Link.findByIdAndUpdate(
          linkId,
          { $set: req.body },
          { new: true }
        ).populate({ path: "category", select: "title" });
        if (updatedLink) {
          res.setHeader("Content-Type", "application/json");
          res.status(200).json({
            status: "success",
            data: updatedLink,
          });
        } else {
          console.log("link cannot be updated");
        }
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

//mark a link as deleted
const deleteLink = async (req, res) => {
  try {
    const linkId = req.params.linkId;
    const linkDetail = await Link.findById(linkId);
    if (linkDetail) {
      //check if owner owns link
      if (String(linkDetail.owner) !== String(req.user._id)) {
        //unauthorised owner
        console.log("you do not own this");
        res.setHeader("Content-Type", "application/json");
        res.status(403).json({
          status: "error",
          data: { message: "You do not own this resources" },
        });
      } else {
        //delete
        const deleteLink = await Link.findByIdAndDelete(linkId);
        if (deleteLink) {
          res.setHeader("Content-Type", "application/json");
          res.status(200).json({
            status: "success",
            data: { message: "Link deleted" },
          });
        }
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
  createLink,
  linkDetail,
  deleteLink,
  updateLink,
};
