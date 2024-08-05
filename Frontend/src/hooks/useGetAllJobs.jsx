import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_ENDPOINTS } from "@/utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQueryHeroSection } = useSelector((store) => store.job);
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const response = await axios.get(
          `${JOB_API_ENDPOINTS}/get?keyword=${searchedQueryHeroSection}`,
          { withCredentials: true }
        );
        if (response.data.success) {
          dispatch(setAllJobs(response.data.jobs));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllJobs();
  }, []);
};

export default useGetAllJobs;
