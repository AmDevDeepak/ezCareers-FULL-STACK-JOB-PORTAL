import express from "express";
const router = express.Router();
import isAuthenticated from "../middlewares/isAuthenticated.js";
import isRecruiter from "../middlewares/isRecruiter.js";

import {
  apply,
  getAppliedJobs,
  getApplicants,
  getApplicantById,
  updateStatus,
} from "../controllers/application.controller.js";


router.route("/apply/:id").get(isAuthenticated, apply);
router.route("/get").get(isAuthenticated, getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/:id/profile").get(isAuthenticated, getApplicantById);
router.route("/status/:id/update").put(isAuthenticated, isRecruiter, updateStatus);

export default router;
