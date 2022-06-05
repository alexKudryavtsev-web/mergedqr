import mongoose from "mongoose";

const { Schema, SchemaTypes, model } = mongoose;

const resetPasswordTokenSchema = new Schema(
  {
    userId: {
      type: SchemaTypes.ObjectId,
      unique: true,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, strict: true }
);

export default model("ResetPasswordToken", resetPasswordTokenSchema);
