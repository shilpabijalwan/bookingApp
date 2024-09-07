import { Router } from "express";

import { upload } from "../middlewares/multer.middleware.js";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userController.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/register")
  .post(upload.fields([{ name: "avatar", maxCount: 1 }]), registerUser);

router.route("/login").post(loginUser);
router.route("/getUser").get(verifyJWT, getUser);

//secure Routes
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
