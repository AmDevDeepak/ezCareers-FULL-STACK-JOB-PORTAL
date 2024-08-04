import {User} from "../models/user.model.js"
const isRecruiter = async (req, res, next) => {
    const user = await User.findById(req.id);
    const isAdmin = user.role === "recruiter";
    if (isAdmin) next();
    else res.status(403).json({message: "Forbidden. Only recruiter can access this route."});
}

export default isRecruiter;