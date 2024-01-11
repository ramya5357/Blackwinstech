import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  userInfo,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").get(loginUser);

// secure routes
router.route("/info").get(verifyJWT, userInfo);
router.route("/logout").get(verifyJWT, logoutUser);

export default router;
