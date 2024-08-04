// Companies.jsx
import CompanyTable from "./CompanyTable";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "../shared/Navbar";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useEffect, useState } from "react";
import { setSearchCompanyByText } from "@/redux/companySlice";
import { useDispatch } from "react-redux";

const Companies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useGetAllCompanies();

  useEffect(() => {
    dispatch(setSearchCompanyByText(searchQuery));
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
                placeholder="Search by name or location..."
                className="pl-4 font-medium sm:w-[300px] md:w-[200px] lg:w-[300px]"
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </div>
            <Button
              onClick={() => navigate("/recruiter/company/create")}
              className="flex items-center gap-2"
            >
              <PlusIcon className="h-4 w-4" />
              Add Company
            </Button>
          </div>
          <CompanyTable />
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

export default Companies;
