const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const keys = require("./config/keys");
const authRoutes = require("./routes/users");
const passport = require("passport");
const mongoose = require("mongoose");
const userLoggedIn = require("./middlewares/userDecoded");
const helmet = require("helmet");
const path = require("path");

app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//database initialization
mongoose.connect(
  keys.dbConnectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => {
    console.log("connected");
  }
);

app.use(passport.initialize());
userLoggedIn(passport);
//welcome route
app.get("/", (req, res) => {
  res.send("WELCOME TO ATOZ LINKS");
});
//router links
authRoutes(app);
app.use(require("./middlewares/verifyUser")); //user logged in
app.use("/api/v1/dashboard", require("./routes/Dashboard/Index"));
//admin Routes
//middleware

app.use(require("./middlewares/verifyUserNotSuspended"));
app.use(require("./middlewares/verifyUserNotBlocked"));
app.use(require("./middlewares/verifyAdmin")); //admin middleware
app.use("/api/v1/admin", require("./routes/Admin/Index"));

// test routes and middlewares
// app.use(require("./middlewares/verifyUser"));
// // app.use(require("./middlewares/verifyUserActivated"));
// require("./routes/testRoute")(app);
if (process.env.NODE_ENV === "production") {
  //express serve up production assets
  const path = require("path");
  app.use(express.static(path.join(__dirname, "client/build")));
  //express serve up index.js file in client if it does not have the file
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`connecting on port ${PORT}`);
});
