import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add name !"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please add email !"],
      trim: true,
      index: true,
    },
    phone: {
      type: Number,
      required: [true, "Please add number !"],
      unique: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Contact = new mongoose.model("Contact", contactSchema);
