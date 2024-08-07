import jwt from "jsonwebtoken";
import config from "../config/serverConfig.js";
const { SECRET_KEY } = config;

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("Here is the req cookies : ", req.cookies);
    if (!token) 
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    const decode = jwt.verify(token, SECRET_KEY);
    if (!decode)
      return res.status(403).json({
        message: "Invalid token",
        success: false,
      });
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log("Some error occurred at authenticate middleware.", error);
  }
};

export default isAuthenticated;
