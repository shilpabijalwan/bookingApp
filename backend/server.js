// const dotenv = require("dotenv");.
import dotenv from "dotenv";
dotenv.config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

//Connect with database
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: "bookingApp",
  });

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
console.log("hellosss--8888--")


app.use("/", function (req, res) {
  res.json({ message: "Hello" });
});

const server = app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
