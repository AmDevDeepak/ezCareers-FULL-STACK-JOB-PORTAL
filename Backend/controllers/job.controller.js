import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      location,
      salary,
      jobType,
      position,
      company,
      experienceLevel,
    } = req.body;
    let postedBy = req.id; // Current user will be posting this job.
    if (
      !title ||
      !description ||
      !requirements ||
      !location ||
      !salary ||
      !jobType ||
      !position ||
      !company ||
      !experienceLevel
    )
      return res.status(404).json({
        message: "Missing required fields",
        success: false,
      });
    const newJobData = {
      title,
      description,
      requirements,
      location,
      salary,
      jobType,
      position,
      experienceLevel,
      company,
      postedBy,
    };
    const job = await Job.create(newJobData);
    return res.status(201).json({
      message: "New Job created",
      success: true,
      job,
    });
  } catch (error) {
    console.log("Some error occurred in job controller", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate({ path: "company" })
      .populate({ path: "postedBy" })
      .sort({ createdAt: -1 });
    if (!jobs)
      return res.status(404).json({ success: false, message: "No jobs found" });
    return res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.log("Some error occurred in job controller", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      model: Application,
    });
    if (!job)
      return res.status(404).json({ success: false, message: "No job found" });
    return res.status(200).json({ success: true, job });
  } catch (error) {
    console.log("Some error occurred in job controller", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// For job poster
export const getAdminJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.id }).populate({
      path: "company",
    });
    if (!jobs)
      return res.status(404).json({ success: false, message: "No jobs found" });
    return res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.log("Some error occurred in job controller", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
