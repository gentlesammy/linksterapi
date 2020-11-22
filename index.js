const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const { SECRET, PORT } = require("./config/index");
const { dbInit } = require("./config/db");
const authRoutes = require("./routes/users");
const passport = require("passport");
const userLoggedIn = require("./middlewares/userDecoded");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//database initialization
dbInit();

app.listen(PORT, () => {
  console.log(`connecting on port ${PORT}`);
});

app.use(passport.initialize());
userLoggedIn(passport);
//router links
authRoutes(app);

app.use("/api/v1/dashboard", require("./routes/Dashboard/Index"));
//admin Routes
app.use(require("./middlewares/verifyUser"));
app.use(require("./middlewares/verifyAdmin"));
app.use(require("./middlewares/verifyUserNotSuspended"));
app.use(require("./middlewares/verifyUserNotBlocked"));

app.use("/api/v1/admin", require("./routes/Admin/Index"));

// test routes and middlewares
// app.use(require("./middlewares/verifyUser"));
// // app.use(require("./middlewares/verifyUserActivated"));
// require("./routes/testRoute")(app);
