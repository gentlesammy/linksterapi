module.exports = (req, res, next) => {
  try {
    if (req.user.role === "admin") {
      return next();
    } else {
      return res.status(401).json({
        status: "error",
        data: { message: "You do not have permission to view this route" },
      });
    }
  } catch (error) {
    console.log("errrrrrrrrrrrrrrrrrrrrrrrrrrr", error);
  }
};