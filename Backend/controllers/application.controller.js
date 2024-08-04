import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";

export const apply = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId)
      return res
        .status(400)
        .json({ message: "Job Id is required", success: true });
    //Check if the job exits
    const job = await Job.findById(jobId);
    if (!job)
      return res
        .status(400)
        .json({ message: "Job does not exist", success: false });
    // If user has already applied for this job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication)
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });

    // Create a new application
    const application = await Application.create({
      job: jobId,
      applicant: userId,
    });
    // push the application into job's application array
    await job.applications.push(application._id);
    await job.save();
    res.status(201).json({
      message: "Application submitted successfully",
      success: true,
      application,
    });
  } catch (error) {
    console.log("Some error occurred in application controller", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const applications = await Application.find({ applicant: userId })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!applications)
      return res
        .status(404)
        .json({ message: "No applications found", success: false });
    res.status(200).json({
      success: true,
      message: "Applied jobs fetched successfully",
      applications,
    });
  } catch (error) {
    console.log("Some error occurred in application controller", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job)
      return res
        .status(400)
        .json({ message: "Job does not exist", success: false });
    const applications = await Application.find({ job: jobId })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "applicant",
        options: { sort: { createdAt: -1 } },
      });
    if (!applications)
      return res
        .status(404)
        .json({ message: "No applications found", success: false });
    res.status(200).json({
      success: true,
      message: "Applicants fetched successfully",
      applications,
    });
  } catch (error) {
    console.log("Some error occurred in application controller", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getApplicantById = async (req, res) => {
  try {
    const applicantId = req.params.id;
    const applicant = await User.findById(applicantId);

    if (!applicant)
      return res
        .status(404)
        .json({ message: "User not found", success: false });

    return res
      .status(200)
      .json({ message: "Applicant fetched successfully", applicant, success: true });
  } catch (error) {
    console.log("Some error occurred in user controller", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateStatus = async (req, res) => {
    try {
    const applicationId = req.params.id;
    if (!applicationId)
      return res
        .status(404)
        .json({ message: "Application id is required", success: false });
    let { status } = req.body;
    status = status.toLowerCase();
    if (!status)
      return res
        .status(404)
        .json({ message: "Status not found", success: false });
    const application = await Application.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Application status updated", status, success: true });
  } catch (error) {
    console.log("Some error occurred in application controller", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
