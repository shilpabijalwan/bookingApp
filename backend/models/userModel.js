import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   userName: mongoose.SchemaTypes.String,
//   phone: mongoose.SchemaTypes.Number,
//   phonecode: mongoose.SchemaTypes.Number,
//   password: mongoose.SchemaTypes.String,
//   role: {
//     type: mongoose.SchemaTypes.String,
//     enum: ["admin", "user", "instructor"],
//     default: "user",
//   },
// });

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["admin", "user", "instructor"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
