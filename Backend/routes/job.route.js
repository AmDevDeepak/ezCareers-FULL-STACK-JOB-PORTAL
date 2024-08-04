import express from "express";
const router = express.Router();
import isAuthenticated from "../middlewares/isAuthenticated.js";

import {
  postJob,
  getJobById,
  getAllJobs,
  getAdminJobs,
} from "../controllers/job.controller.js";

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/getAdminJobs").get(isAuthenticated, getAdminJobs);

export default router;
