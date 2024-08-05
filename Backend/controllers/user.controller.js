import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/serverConfig.js";
import { getDataUri } from "../config/helper.js";
import cloudinary from "../config/cloudinary.js";
const { SECRET_KEY, NODE_ENV } = config;

export const register = async (req, res) => {
  try {
    const { fullname, email, password, phoneNumber, role } = req.body;
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudinaryResult = await cloudinary.uploader.upload(fileUri.content);

    if (!fullname || !email || !password || !phoneNumber || !role)
      return res
        .status(400)
        .json({ message: "Missing required fields", success: false });

    const user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ message: "Email already registered", success: false });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
      profile: {
        profilePhoto: cloudinaryResult.secure_url,
      },
    });
    res
      .status(201)
      .json({ message: "User registered successfully", success: true });
  } catch (error) {
    console.log("Some error occurred in user controller", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role)
      return res
        .status(400)
        .json({ message: "Missing required fields", success: false });

    let user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: "Email is not valid", success: false });

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      return res
        .status(400)
        .json({ message: "Incorrect Passoword", success: false });
    if (role !== user.role)
      return res.status(400).json({
        message: "Account doesn't exists with current role",
        success: false,
      });

    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, SECRET_KEY, { expiresIn: "1d" });
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    console.log("In user controller, and user is :", user);
    console.log("IN user controller and token is :", token);
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        secure: NODE_ENV === "production",
        httpOnly: true,
        sameSite: "None",
      })
      .json({
        message: `Logged in successfully. Welcome ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log("Some error occurred in user controller", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "Logged out successfully", success: true });
  } catch (error) {
    console.log("Some error occurred in user controller", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    let { fullname, phoneNumber, email, bio, skills } = req.body;
    const userId = req.id;
    const file = req.file;

    let updateData = {};
    if (fullname) updateData.fullname = fullname;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;
    if (email) updateData.email = email;
    if (bio) updateData["profile.bio"] = bio;
    if (skills) {
      let skillsArray = skills.split(/[\s,]+/);
      updateData["profile.skills"] = skillsArray;
    }

    // Check if a resume file is provided
    if (file) {
      const fileUri = getDataUri(file);
      const cloudinaryResult = await cloudinary.uploader.upload(
        fileUri.content
      );

      /***********************/
      const isPdf = file.type === "application/pdf";
      const hasPdfExtension = file.originalname.endsWith(".pdf");

      if (!hasPdfExtension) {
        return res
          .status(500)
          .json({ success: false, message: "Only PDF file supported." });
      }
      /***********************/
      updateData["profile.resume"] = cloudinaryResult.secure_url;
      updateData["profile.resumeOriginalName"] = file.originalname;
    }

    let user = await User.findByIdAndUpdate(userId, updateData, { new: true });

    await user.save();
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    return res
      .status(200)
      .json({ message: "Profile updated successfully", user, success: true });
  } catch (error) {
    console.log("Some error occurred in user controller", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
