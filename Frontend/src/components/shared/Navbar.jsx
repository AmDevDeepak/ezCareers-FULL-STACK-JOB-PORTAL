import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  capitalizeFirstLetter,
  USER_API_ENDPOINTS,
} from "../../utils/constants.js";
import { setUser } from "../../redux/authSlice.js";
import { toast } from "sonner";
import axios from "axios";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const response = await axios.post(`${USER_API_ENDPOINTS}/logout`, {
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  const { user } = useSelector((store) => store.auth);
  return (
    <div className="top-0 flex items-center justify-between mx-auto max-w-[90rem] py-8  text-[#121212]">
      <div>
        <Link to="/">
          <h1 className="text-4xl font-bold tracking-tight">
            <span className="text-[#f83002] mr-1">ez</span>Careers
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-12">
        <ul className="flex font-medium items-center gap-4 text-[1rem]">
          {user && user.role === "recruiter" ? (
            <>
              <li>
                <Link to="/recruiter/companies">Your Companies</Link>
              </li>
              <li>
                <Link to="/recruiter/jobs">Jobs</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/jobs">Jobs</Link>
              </li>
              <li>
                <Link to="/explore">Explore</Link>
              </li>
            </>
          )}
        </ul>

        {!user ? (
          <div>
            <Link to="/login">
              <Button col variant="outline">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="ml-2 bg-[#f83002] hover:bg-[#121212]">
                Sign Up
              </Button>
            </Link>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={user?.profile?.profilePhoto} />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="flex items-center gap-[0.7rem]">
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
                <div>
                  <h4 className="font-medium">{user.fullname}</h4>
                  <p className="text-sm text-muted-foreground leading-none mt-1">
                    {capitalizeFirstLetter(user?.role)}
                  </p>
                </div>
              </div>
              <div className="flex flex-col text-gray-400 mt-2">
                {user && user.role === "jobseeker" && (
                  <div className="flex w-fit items-center gap-2">
                    <User2 />
                    <Button variant="link">
                      <Link to="/profile">View Profile</Link>
                    </Button>
                  </div>
                )}

                <div className="flex w-fit items-center gap-2">
                  <LogOut />
                  <Button onClick={logoutHandler} variant="link">
                    Logout
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default Navbar;
