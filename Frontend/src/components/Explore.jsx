import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import { useDispatch, useSelector } from "react-redux";
import LatestJobCard from "./LatestJobCard";
import { setSearchedQueryHeroSection } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Explore = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      // cleanup code here
      dispatch(setSearchedQueryHeroSection(""));
    };
  }, []);
  return (
    <div>
      <Navbar />
      <div className="px-20">
        <div className="grid grid-cols-3 gap-4 my-5">
          {allJobs.length !== 0 ? (
            allJobs.map((job) => <LatestJobCard key={job._id} job={job} />)
          ) : (
            <h1 className="font-bold text-2xl">
              No jobs found.
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
