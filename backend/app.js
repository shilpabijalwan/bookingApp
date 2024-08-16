import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // For parsing application/json
app.use(express.static("public"));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// routes imports
import userRoutes from "./routes/userRoutes.js";

// router declaration
app.use("/users", userRoutes);

//  http://localhost:8000/users/register

export { app };
