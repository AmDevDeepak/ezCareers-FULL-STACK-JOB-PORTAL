import axios from "axios";
import moment from "moment";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "./shared/Navbar";

import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  APPLICATION_API_ENDPOINTS,
  JOB_API_ENDPOINTS,
  findTotalMatchingSkills,
} from "@/utils/constants";

import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { TrophyIcon } from "lucide-react";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  // console.log(singleJob.requirements);
  // console.log(user?.profile.skills);
  const totalMatchingSkills = findTotalMatchingSkills(
    user?.profile?.skills,
    singleJob?.requirements +" "+ singleJob?.description
  );

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const response = await axios.get(
        `${APPLICATION_API_ENDPOINTS}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const response = await axios.get(`${JOB_API_ENDPOINTS}/get/${jobId}`, {
          withCredentials: true,
        });
        if (response.data.success) {
          dispatch(setSingleJob(response.data.job));
          setIsApplied(
            response.data.job?.applications?.some(
              (application) => application.applicant === user?._id
            )
          );
        }
        //console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);
  return (
    <div>
      <Navbar></Navbar>
      <div className="bg-background text-foreground sm:p-8 md:p-10 rounded-lg max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
          <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
            <h1 className="text-3xl font-bold">{singleJob?.title}</h1>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
              <Badge variant="secondary">
                <BriefcaseIcon className="w-4 h-4 mr-2" />
                &nbsp;{singleJob?.position}&nbsp;open positions
              </Badge>
              <Badge variant="secondary">
                <ClockIcon className="w-4 h-4 mr-2" />
                &nbsp;{singleJob?.jobType}&nbsp;
              </Badge>
              <Badge variant="secondary">
                <IndianRupeeIcon className="w-4 h-4 mr-2" />
                &nbsp;{singleJob?.salary} LPA
              </Badge>
            </div>
            <div className="flex flex-col items-start gap-2">
              <Badge
                variant="outline"
                className="px-3 py-1 text-sm font-medium flex items-center gap-2 w-[35%]"
              >
                <TrophyIcon className="h-4 w-4" />
                We found {totalMatchingSkills} matching keywords for this role.
              </Badge>
              {isApplied === true ? (
                <Button className="text-white" disabled>
                  Applied
                </Button>
              ) : (
                <Button onClick={applyJobHandler}>Apply Now</Button>
              )}
            </div>
          </div>
          <div className="grid gap-4 sm:gap-6 md:gap-8">
            <div>
              <h2 className="text-xl font-bold mb-1 sm:mb-2 md:mb-2">
                Description
              </h2>
              <p className="text-muted-foreground">{singleJob?.description}</p>
              <h2 className="text-xl font-bold mb-1 mt-2 sm:mb-2 md:mb-2">
                Requirements
              </h2>
              <p className="text-muted-foreground">{singleJob?.requirements}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <div>
                <h3 className="text-lg font-bold mb-2 sm:mb-3 md:mb-4">Role</h3>
                <p>{singleJob?.title}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 sm:mb-3 md:mb-4">
                  Location
                </h3>
                <p>{singleJob?.location}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 sm:mb-3 md:mb-4">
                  Experience Level
                </h3>
                <p>{singleJob?.experienceLevel}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 sm:mb-3 md:mb-4">
                  Salary
                </h3>
                <p>{singleJob?.salary} LPA</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <div>
                <h3 className="text-lg font-bold mb-2 sm:mb-3 md:mb-4">
                  Applicants
                </h3>
                <p>{singleJob?.applications.length}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 sm:mb-3 md:mb-4">
                  Posted
                </h3>
                <p>{moment(singleJob?.createdAt).fromNow()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function BriefcaseIcon() {
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
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

function ClockIcon() {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IndianRupeeIcon() {
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
      <path d="M6 3h12" />
      <path d="M6 8h12" />
      <path d="m6 13 8.5 8" />
      <path d="M6 13h3" />
      <path d="M9 13c6.667 0 6.667-10 0-10" />
    </svg>
  );
}

export default JobDescription;
