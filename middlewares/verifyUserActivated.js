module.exports = (req, res, next) => {
  try {
    if (req.user.activated === true) {
      return next();
    } else {
      return res.status(401).json({
        status: "error",
        data: { message: "You Have not activated your account, you cannot access this route" },
      });
    }
  } catch (error) {
    console.log("errrrrrrrrrrrrrrrrrrrrrrrrrrr", error);
  }
};