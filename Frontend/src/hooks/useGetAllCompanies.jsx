import { setCompanies } from "@/redux/companySlice.js";
import { COMPANY_API_ENDPOINTS } from "@/utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          `${COMPANY_API_ENDPOINTS}/get`,
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          dispatch(setCompanies(response.data.companies || []));
        } else {
          console.error("Invalid response from the API");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCompanies();
  }, []);
};

export default useGetAllCompanies;
