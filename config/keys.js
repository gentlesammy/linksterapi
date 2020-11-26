// module.exports = {

if (process.env.NODE_ENV === "production") {
  //we are in production environment
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}

//APP_SECRET= mongodb+srv://linkster_admin:MOWE_1984_KOMETH_kometh@linster.ya94c.mongodb.net/linkster?retryWrites=true&w=majority
