import { Router } from "express";
import { getUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/users").get(getUser);

export default router;
