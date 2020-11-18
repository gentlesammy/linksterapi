const { DB_LINK } = require("../config/index");
const mongoose = require("mongoose");

const dbInit = async () => {
  await mongoose.connect(
    DB_LINK,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true,
    },
    () => {
      console.log("connected");
    }
  );
};

module.exports = {
  dbInit,
};
