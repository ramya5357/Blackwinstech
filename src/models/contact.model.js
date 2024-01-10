import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add name !"],
    },
    email: {
      type: String,
      required: [true, "Please add email !"],
    },
    phone: {
      type: Number,
      required: [true, "Please add number !"],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Contact = new mongoose.model("Contact", contactSchema);
