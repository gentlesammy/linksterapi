const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const { SECRET, PORT } = require("./config/index");
const { dbInit } = require("./config/db");
const authRoutes = require("./routes/users");
const passport = require("passport")
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

// test routes and middlewares
// app.use(require("./middlewares/verifyUser"));
// // app.use(require("./middlewares/verifyUserActivated"));
// require("./routes/testRoute")(app);

