import { Label } from "@radix-ui/react-label";
import Navbar from "../shared/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_ENDPOINTS } from "@/utils/constants";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const CreateCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState();

  const registerCompany = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${COMPANY_API_ENDPOINTS}/register`,
        { name: companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        dispatch(setSingleCompany(response.data.company));
        toast.success(response.data.message);

        const companyId = response.data?.company?._id;
        navigate("/recruiter/company/" + companyId);
      } else {
        toast.error(error.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center">
        <Card className="max-w-7xl mx-auto my-8 shadow-md">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              Register a New Company
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-md font-normal text-muted-foreground">
                What's the name of Brand/Company. You can change it later.
              </Label>
              <Input
                type="text"
                name="name"
                placeholder="eg : Microsoft"
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="w-full flex justify-end gap-3">
              <Button
                variant="outline"
                className="w-32"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              {loading ? (
                <Button className="w-32" disabled>
                  Please Wait...
                  <Loader2 className="ml-2 w-6 h-6 animate-spin" />
                </Button>
              ) : (
                <Button onClick={registerCompany} className="w-40">
                  Continue
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateCompany;
