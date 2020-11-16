require("dotenv").config();

module.exports = {
  SECRET: process.env.APP_SECRET,
  DB_LINK: process.env.APP_DB_LINK,
  PORT: process.env.APP_PORT,
};
