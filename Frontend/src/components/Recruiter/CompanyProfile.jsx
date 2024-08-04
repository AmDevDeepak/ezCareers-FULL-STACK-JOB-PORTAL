import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "../shared/Navbar";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { COMPANY_API_ENDPOINTS } from "@/utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanyProfile = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [loading, setLoading] = useState(false);

  const { singleCompany } = useSelector((store) => store.company);

  const companyId = params.id;
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    description: "",
    location: "",
    file: null,
  });
  const changeEventHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const changeFileHandler = (event) => {
    const file = event.target.files[0];
    setInput({ ...input, file });
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("location", input.location);
    if (input.file) formData.append("file", input.file);

    try {
      setLoading(true);
      const response = await axios.put(
        `${COMPANY_API_ENDPOINTS}/update/${companyId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response?.data?.message);
        navigate(`/recruiter/companies`);
      }
      toast.success("Company profile updated successfully!");
      setLoading(false);
      setInput({
        name: "",
        description: "",
        location: "",
        file: null,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      location: singleCompany?.location || "",
      file: null,
    });
  }, [singleCompany]);

  return (
    <div>
      <Navbar />
      <div className="w-full max-w-7xl mx-auto p-6 sm:p-8 md:p-10">
        <div className="flex items-center mb-6">
          <Button onClick={() => navigate("/recruiter/companies")}>
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
        <h1 className="text-3xl font-bold mb-8">Edit Company Profile</h1>
        <form className="space-y-6" onSubmit={formSubmitHandler}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input
                id="company-name"
                placeholder="Enter company name"
                value={input.name}
                name="name"
                onChange={changeEventHandler}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-location">Location</Label>
              <Input
                id="company-location"
                type="text"
                placeholder="Enter comapany location"
                value={input.location}
                name="location"
                onChange={changeEventHandler}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="company-description">Description</Label>
            <Textarea
              name="description"
              placeholder="Give description of your company"
              rows={4}
              id="comands-description"
              value={input.description}
              onChange={changeEventHandler}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company-logo">Logo</Label>
              <Input
                id="company-logo"
                name="file"
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>
          </div>
          <div className="flex justify-end">
            {loading ? (
              <Button disabled>
                Saving changes...
                <Loader2 className="ml-2 w-4 h-4 animate-spin" />
              </Button>
            ) : (
              <Button type="submit">Save changes</Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

function ArrowLeftIcon() {
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
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

export default CompanyProfile;
