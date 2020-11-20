const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    title: {
      type: String,
      minlength: 5,
      maxlength: 50,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      minlength: 20,
      maxlength: 500,
    },
    inUse: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Category", categorySchema);
