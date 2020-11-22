const { Schema, model } = require("mongoose");

const profileSchema = new Schema(
  {
    thumbnail: {
      type: String,
      default: "default.jpg",
    },

    colorTheme: {
      type: String,
      enum: ["primaryBlue", "primaryGreen", "primaryRed", "primaryBlack"],
    },
  },
  { timestamps: true }
);

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    activated: {
      type: Boolean,
      default: false,
    },
    suspended: {
      type: Boolean,
      default: false,
    },
    credit: {
      type: Number,
      default: 0,
    },
    paymentHistory: [],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    profile: profileSchema,
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
