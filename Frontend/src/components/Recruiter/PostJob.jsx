import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Navbar from "../shared/Navbar";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_ENDPOINTS } from "@/utils/constants";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    experienceLevel: "",
    salary: "",
    jobType: "",
    position: "",
    company: "",
  });
  const changeEventHandler = (event) => {
    setInput({ ...input, [event.target.id]: event.target.value });
  };

  const handleExperienceChange = (value) => {
    setInput({ ...input, experienceLevel: value });
  };
  const handleJobTypeChange = (value) => {
    setInput({ ...input, jobType: value });
  };
  const handleCompanyChange = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, company: selectedCompany._id });
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    //console.log(input);
    if (input.position === "0" || Number(input.position) < 0)
      return toast.error("Position is not valid.");
    if (input.salary <= 0) return toast.error("Salary is not valid.");

    try {
      setLoading(true);
      const response = await axios.post(`${JOB_API_ENDPOINTS}/post`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/recruiter/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="w-full max-w-7xl mx-auto p-4 sm:p-8 md:p-5">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Post a New Job</h1>
            <p className="text-muted-foreground">
              Fill out the form below to list a new job opening.
            </p>
          </div>
          <form
            onSubmit={formSubmitHandler}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  name="title"
                  onChange={changeEventHandler}
                  value={input.title}
                  placeholder="Software Engineer"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  rows={5}
                  name="description"
                  onChange={changeEventHandler}
                  value={input.description}
                  placeholder="Describe the job and responsibilities..."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  rows={5}
                  placeholder="List the required skills..."
                  name="requirements"
                  onChange={changeEventHandler}
                  value={input.requirements}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Gurugram, Haryana India"
                  name="location"
                  onChange={changeEventHandler}
                  value={input.location}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="salary">Salary in LPA</Label>
                <Input
                  id="salary"
                  type="number"
                  placeholder="In LPA"
                  name="salary"
                  onChange={changeEventHandler}
                  value={input.salary}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="jobType">Job Type</Label>
                <Select
                  id="jobType"
                  value={input.jobType}
                  onValueChange={handleJobTypeChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-Time</SelectItem>
                    <SelectItem value="Part-time">Part-Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="experienceLevel">Experience Level</Label>
                  <Select
                    id="experienceLevel"
                    value={input.experienceLevel}
                    onValueChange={handleExperienceChange}
                    type="number"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0 Years</SelectItem>
                      <SelectItem value="1">1 Years</SelectItem>
                      <SelectItem value="2">2 Years</SelectItem>
                      <SelectItem value="3">3 Years</SelectItem>
                      <SelectItem value="4">4 - 5 Years</SelectItem>
                      <SelectItem value="6">5+ Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="position">Total Positions</Label>
                  <Input
                    id="position"
                    type="number"
                    placeholder="5"
                    name="position"
                    onChange={changeEventHandler}
                    value={input.position}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company">Company</Label>
                <Select id="company" onValueChange={handleCompanyChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem
                        key={company._id}
                        value={company?.name.toLowerCase()}
                      >
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end">
                {companies.length === 0 ? (
                  <Button
                    variant="outline"
                    className="bg-gray-700 text-white"
                    disabled
                  >
                    * You cannot post a job without a company.
                  </Button>
                ) : (
                  <Button type="submit" className="px-[7.4rem]">
                    {loading ? "Posting job..." : "Post Job"}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
