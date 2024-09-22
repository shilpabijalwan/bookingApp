import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    slots: {
      required: true,
      type: [],
      default: undefined,
      index: true,
      isBooked: false,
    },
    instructorId: {},
    date: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

export const Session = mongoose.model("Session", sessionSchema);
