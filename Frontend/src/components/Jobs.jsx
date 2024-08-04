import FilterCard from "./FilterCard";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQueryHeroSection } = useSelector(
    (store) => store.job
  );
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQueryHeroSection) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title
            .toLowerCase()
            .includes(searchedQueryHeroSection.toLowerCase()) ||
          job.location
            .toLowerCase()
            .includes(searchedQueryHeroSection.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQueryHeroSection]);
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 relative">
        <div className="flex gap-5 w-full">
          <div className="w-[20%] relative">
            <FilterCard />
          </div>
          {filterJobs.length === 0 ? (
            <h2>No jobs found.</h2>
          ) : (
            <div className="no-scroll flex-1 h-[100vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    key={job._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Jobs;
