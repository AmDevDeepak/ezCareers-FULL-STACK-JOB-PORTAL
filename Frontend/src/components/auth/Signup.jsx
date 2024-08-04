import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { useEffect, useState } from "react";
import { USER_API_ENDPOINTS } from "../../utils/constants.js";
import axios from "axios";
import { toast } from "sonner";

import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice.js";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const { user, loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
    file: "",
  });
  const changeEventHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };
  const changeFileHandler = (event) => {
    setInput({ ...input, file: event.target.files?.[0] });
  };
  const toggleShowPassword = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);
    formData.append("phoneNumber", input.phoneNumber);
    if (input.file) formData.append("file", input.file);

    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        `${USER_API_ENDPOINTS}/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

     // console.log("Response that came", response);

      if (response.data.success) {
        navigate("/login");
        toast.success(response.data.message); // Ensure you are accessing the message correctly
      }
    } catch (error) {
      console.log("Some error occurred in form submission", error);
      toast.error(error.response?.data?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
      toast.error("You need to logout first.");
    }
  }, []);
  return (
    <div className="w-full h-screen flex">
      <div className="w-1/2 h-full flex flex-col justify-center px-16">
        <div className="headings">
          <h1 className="text-6xl font-bold leading-none from-neutral-900">
            Join <span className="text-[#f83002] mr-1">ez</span>Careers, <br />{" "}
            the latest community of job seekers and recruiters.
          </h1>
          <h2 className="text-xl font-semibold leading-none text-zinc-800 mt-4">
            Create your account and start applying for your dream job today.
          </h2>
        </div>
        <div className="benifits mt-5">
          <h3 className="text-3xl font-bold leading-none">Why ezCareers ?</h3>
          <ul className="mt-2 font-medium text-[1.28rem] text-gray-700">
            <li className="flex items-center gap-2">
              {" "}
              <span className="block w-[5px] h-[5px] rounded-full bg-gray-700"></span>{" "}
              Access to exclusive job postings
            </li>
            <li className="flex items-center gap-2">
              {" "}
              <span className="block w-[5px] h-[5px] rounded-full bg-gray-700"></span>{" "}
              Easy application process
            </li>
            <li className="flex items-center gap-2">
              {" "}
              <span className="block w-[5px] h-[5px] rounded-full bg-gray-700"></span>{" "}
              Hiring made easy
            </li>
          </ul>
        </div>
      </div>
      <div className="form-div w-1/2 h-full flex flex-col items-center justify-center mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-[65%] border border-gray-200 rounded-md py-6 px-7"
        >
          <h1 className="font-semibold text-3xl">Create your account</h1>
          <h5 className="text-[1rem] mt-1 font-medium mb-2 text-gray-700">
            Enter your details to get started.
          </h5>

          <div className="flex flex-col gap-2">
            <div>
              <Label>Full Name</Label>
              <Input
                className="mt-1"
                type="text"
                value={input.fullname}
                onChange={changeEventHandler}
                placeholder="eg Deepak Chauhan"
                name="fullname"
              />
            </div>

            <div>
              <Label>Phone Number</Label>
              <Input
                className="mt-1"
                type="Number"
                placeholder="Enter your phone number"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                name="phoneNumber"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                className="mt-1"
                type="email"
                placeholder="example@mail.com"
                value={input.email}
                onChange={changeEventHandler}
                name="email"
              />
            </div>
            <div>
              <Label>Password</Label>
              <div className="flex gap-1">
                <Input
                  className="mt-1"
                  type={showPass ? "text" : "password"}
                  value={input.password}
                  onChange={changeEventHandler}
                  name="password"
                />
                <Button
                  variant="ghost"
                  className={`mt-1 text-xs text-gray-500 cursor-pointer ${
                    showPass ? "text-blue-600" : ""
                  }`}
                  onClick={toggleShowPassword}
                >
                  {showPass ? "Hide" : "Show"} Password
                </Button>
              </div>
            </div>

            <div className="flex items-start mt-1 flex-col">
              <small className="font-normal text-[0.95rem] py-2">
                Create account as
              </small>

              <RadioGroup className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="jobseeker"
                    className="cursor-pointer"
                    checked={input.role === "jobseeker"}
                    onChange={changeEventHandler}
                  />
                  <Label htmlFor="role">JobSeeker</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    className="cursor-pointer"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                  />
                  <Label htmlFor="role">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label>Add Profile Photo <small>*required</small> </Label>
              <br />
              <small>
                A clear and professional photo helps personalize your profile.
              </small>
              <Input
                accept="image/*"
                className="mt-1"
                type="file"
                onChange={changeFileHandler}
              />
            </div>
            {loading ? (
              <Button className="w-full mt-3" disabled>
                Creating your account ...
                <Loader2 className="ml-2 w-4 h-4 animate-spin" />
              </Button>
            ) : (
              <Button type="submit" className="w-full mt-3">
                Create Account
              </Button>
            )}
          </div>

          <h5 className="text-normal mt-[0.7rem] font-medium">
            Already have an account ?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </h5>
        </form>
      </div>
    </div>
  );
};

export default Signup;




