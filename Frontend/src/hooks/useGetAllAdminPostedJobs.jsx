import { setAllAdminJobs } from "@/redux/jobSlice";
import { JOB_API_ENDPOINTS } from "@/utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminPostedJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const response = await axios.get(`${JOB_API_ENDPOINTS}/getAdminJobs`, {
          withCredentials: true,
        });
        if (response.data.success) {
          dispatch(setAllAdminJobs(response.data.jobs));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllAdminJobs();
  }, []);
};

export default useGetAllAdminPostedJobs;
