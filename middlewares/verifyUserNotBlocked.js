module.exports = (req, res, next) => {
  try {
    if (req.user.blocked === false) {
      return next();
    } else {
      return res.status(401).json({
        status: "error",
        data: { message: "You Have been blocked from using the application for now" },
      });
    }
  } catch (error) {
    console.log("errrrrrrrrrrrrrrrrrrrrrrrrrrr", error);
  }
};