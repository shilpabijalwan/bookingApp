import dotenv from "dotenv";

import cors from "cors";
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config();

const PORT = process.env.PORT || 8000;

app.use(cors());
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000);
    console.log(`server is runnig in port ${PORT}`);
  })
  .catch((err) => {
    console.log("mongo db connect failed", err);
  });

app.get("/", function (req, res) {
  res.json({ message: "Hello" });
});
