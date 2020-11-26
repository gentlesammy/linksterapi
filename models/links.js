const { Schema, model } = require("mongoose");

const linkSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      min: 5,
      max: 50,
    },
    href: {
      type: String,
      required: true,
      min: 5,
    },
    description: {
      type: String,
      required: true,
      min: 5,
      max: 50,
    },
    category: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    thumbnail: {
      type: String,
      default: "default.jpg",
    },
    priority: {
      type: Number,
      default: 1,
      max: 5,
    },
    active: {
      type: Boolean,
      default: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    owner: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = model("Link", linkSchema);
