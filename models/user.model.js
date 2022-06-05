import mongoose from "mongoose";

import ApiError from "../error/api.error.js";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    activationLink: {
      type: String,
      required: true,
    },
    resetPasswordLink: {
      type: String,
      required: false,
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

userSchema.statics.findUserByEmail = async function (email) {
  const user = this.findOne({ email });

  if (!user) {
    throw ApiError.BadRequest("User not found");
  }

  return user;
};
export default model("User", userSchema);
