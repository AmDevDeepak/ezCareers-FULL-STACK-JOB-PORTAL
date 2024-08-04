import React from "react";
import LatestJobCard from "./LatestJobCard.jsx";
import { useSelector } from "react-redux";
const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  return (
    <div className="max-w-7xl mx-auto">
      <div>
        <h1 className="text-4xl font-bold">
          Featured Job <span className="text-[#f83002]">Opportunities</span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Explore the latest job from top companies.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4 my-5">
        {allJobs.length !== 0 ? (
          allJobs
            .slice(0, 6)
            .map((job) => <LatestJobCard key={job._id} job={job} />)
        ) : (
          <h1 className="font-bold text-xl">No jobs listed for now.</h1>
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
