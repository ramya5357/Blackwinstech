import { Router } from "express";
import {
  createContact,
  deleteContact,
  getContact,
  getSingleContact,
  updateContact,
} from "../controllers/contact.controller.js";

const router = Router();

router.route("/get-contacts").get(getContact);
router.route("/create-contact").post(createContact);
router.route("/get-single-contact").get(getSingleContact);
router.route("/update-contact").put(updateContact);
router.route("/delete-contact").delete(deleteContact);

export default router;
