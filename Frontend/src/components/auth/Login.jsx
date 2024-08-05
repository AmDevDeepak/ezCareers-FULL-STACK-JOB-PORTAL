import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { useEffect, useState } from "react";
import axios from "axios";

import { USER_API_ENDPOINTS } from "../../utils/constants.js";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice.js";
import { Loader2 } from "lucide-react";
const Login = () => {
  const { loading, user } = useSelector((store) => store.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPass, setShowPass] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const changeEventHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };
  const toggleShowPassword = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);
    const uri = USER_API_ENDPOINTS + '/login';
    console.log(uri);
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${USER_API_ENDPOINTS}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(response);
      if (response.data.success === true) {
        dispatch(setUser(response.data.user));
        navigate("/");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log("Some error occurred in form submission", error);
      toast.error(error.response?.data?.message);
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
      toast.success("You are already logged in");
    }
  }, []);
  return (
    <div className="w-full h-screen flex">
      <div className="form-div w-1/2 h-full flex flex-col items-center justify-center mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-[65%] border border-gray-200 rounded-md py-6 px-7"
        >
          <h1 className="font-semibold text-3xl">Login to your account</h1>
          <h5 className="text-[1rem] mt-1 font-medium mb-2 text-gray-700">
            Enter your details to get into ezCareers.
          </h5>

          <div className="flex flex-col gap-2">
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

            <div className="flex items-start flex-col">
              <small className="font-normal text-[0.95rem] py-2">
                Account type
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
            {loading ? (
              <Button className="mt-3" disabled>
                Logging you in...
                <Loader2 className="ml-2 w-4 h-4 animate-spin" />
              </Button>
            ) : (
              <Button type="submit" className="mt-3">
                Login
              </Button>
            )}
          </div>

          <h5 className="text-normal mt-[0.7rem] font-medium">
            Don't have an account ?{" "}
            <Link to="/signup" className="text-blue-600">
              Signup
            </Link>
          </h5>
        </form>
      </div>
    </div>
  );
};

export default Login;
