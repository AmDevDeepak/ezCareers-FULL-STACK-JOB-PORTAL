import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_ENDPOINTS } from "@/utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();
 useEffect(() => {
   const fetchAppliedJobs = async () => {
     try {
       const response = await axios.get(`${APPLICATION_API_ENDPOINTS}/get`, {
         withCredentials: true,
       });
       if (response.data.success) {
         const applications = response.data.applications; 
         dispatch(setAllAppliedJobs(applications));
       }
     } catch (error) {
       console.log(error);
     }
   };
   fetchAppliedJobs();
 }, [dispatch]);
};

export default useGetAppliedJobs;
