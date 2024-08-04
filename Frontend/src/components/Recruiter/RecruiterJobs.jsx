import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "../shared/Navbar";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import RecruiterJobsTable from "./RecruiterJobsTable";
import useGetAllAdminPostedJobs from "@/hooks/useGetAllAdminPostedJobs";
import { setSearchJobByText } from "@/redux/jobSlice";

const RecruiterJobs = () => {
  useGetAllAdminPostedJobs();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(searchQuery));
  }, [searchQuery]);
  return (
    <div>
      <Navbar />
      <div className="flex flex-col w-full px-5">
        <div className="flex px-10 md:px-5 flex-col">
          <div className="flex items-center w-full justify-between">
            <div className="relative flex items-center">
              <Input
                type="search"
                placeholder="Search by company or role..."
                className="pl-4 font-medium sm:w-[300px] md:w-[200px] lg:w-[300px]"
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </div>
            <Button
              onClick={() => navigate("/recruiter/jobs/create")}
              className="flex items-center gap-2"
            >
              <PlusIcon className="h-4 w-4" />
              Post New Job
            </Button>
          </div>
          <RecruiterJobsTable />
        </div>
      </div>
    </div>
  );
};

function PlusIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

export default RecruiterJobs;
