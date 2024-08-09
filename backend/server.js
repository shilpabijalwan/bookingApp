import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
import cors from "cors";

// const HOST = process.env.HOST || "0.0.0.0";

//Connect with database
// main().catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect(process.env.MONGODB_URI, {
//     dbName: "bookingApp",
//   });

// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }

app.use(cors());

app.get("/", function (req, res) {
  res.json({ message: "Hello" });
});
app.get("/api/blog", function (req, res) {
  const blogs = [
    { blog: "1", id: 1 },
    { blog: "2", id: 2 },
    { blog: "3", id: 3 },
    { blog: "4", id: 4 },
  ];
  res.send({ data: blogs, status: 200 });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
