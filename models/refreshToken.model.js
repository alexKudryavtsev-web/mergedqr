import mongoose from "mongoose";

const { Schema, SchemaTypes, model } = mongoose;

const RefreshTokenSchema = new Schema(
  {
    userId: {
      type: SchemaTypes.ObjectId,
      required: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    timeseries: true,
    strict: true,
  }
);

export default model("RefreshToken", RefreshTokenSchema);
