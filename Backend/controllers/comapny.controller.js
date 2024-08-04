import cloudinary from "../config/cloudinary.js";
import { getDataUri } from "../config/helper.js";
import { Company } from "../models/company.model.js";

export const registerCompany = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name)
      return res
        .status(404)
        .json({ message: "Company name not found", success: false });

    let company = await Company.findOne({ name });
    if (company)
      return res
        .status(400)
        .json({ message: "Cannot register same company", success: false });
    const userId = req.id;
    company = await Company.create({ name, userId });
    return res.status(201).json({
      message: "Company registered successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log("Some error occurred in company controller", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    if (!companies)
      return res
        .status(404)
        .json({ success: false, message: "No companies found!" });
    return res.status(200).json({
      companies,
      message: "Companies found successfully",
      success: true,
    });
  } catch (error) {
    console.log("Some error occurred in company controller", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company)
      return res
        .status(404)
        .json({ success: false, message: "Company not found!" });
    return res.status(200).json({
      company,
      message: "Company found successfully",
      success: true,
    });
  } catch (error) {
    console.log("Some error occurred in company controller", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    const { name, description, location } = req.body;
    const file = req.file;
    let updateData = { name, description, location };
    if (file) {
      const fileUri = getDataUri(file);
      const cloudinaryResult = await cloudinary.uploader.upload(
        fileUri.content
      );
      const logo = cloudinaryResult.secure_url;
      updateData = { ...updateData, logo };
    }
    const company = await Company.findByIdAndUpdate(companyId, updateData, {
      new: true,
    });
    if (!company)
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    return res.status(200).json({
      company,
      message: "Company updated successfully",
      success: true,
    });
  } catch (error) {
    console.log("Some error occurred in company controller", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
