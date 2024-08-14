import mongoose, { mongo } from "mongoose";
import { DB_Name } from "../constant.js";
import { app } from "../app.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_Name}`
    );

    console.log(connectionInstance.connection.host, "monodb connectt host");
    app.on("error", (error) => {
      console.log("error", error);
    });
  } catch (error) {
    console.log(error, "mongodb connection error");
    process.exit(1);
  }
};
export default connectDB;
