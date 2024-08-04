import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Navbar from "../shared/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { APPLICATION_API_ENDPOINTS } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";
import { toast } from "sonner";
const Applicants = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const applicationId = params.id;
  const { applicants } = useSelector((store) => store.application);
  const status = applicants.map((applicant) => applicant.status);
  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        var response = await axios.get(
          `${APPLICATION_API_ENDPOINTS}/${applicationId}/applicants`,
          { withCredentials: true }
        );
        if (response.data.success) {
          dispatch(setAllApplicants(response?.data?.applications));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, [status]);

  // Accept or reject the application:
  const handleApplicationStatus = async (status, id) => {
    try {
      const response = await axios.put(
        `${APPLICATION_API_ENDPOINTS}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="container mx-auto my-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">
            Applicants ({applicants.length})
          </h1>
          <div />
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant Name</TableHead>
                <TableHead>Applicant Profile</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applicants &&
                applicants.map((applicant) => (
                  <TableRow key={applicant.applicant._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={applicant?.applicant?.profile?.profilePhoto}
                            alt="Applicant"
                          />
                          <AvatarFallback>
                            {applicant?.applicant?.fullname.slice(0, 1)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {applicant.applicant.fullname}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        className="text-blue-500 hover:underline"
                        onClick={() =>
                          navigate(
                            `/recruiter/jobs/${applicationId}/applicants/${applicant.applicant._id}/profile`
                          )
                        }
                      >
                        View Profile
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {applicant.status === "accepted" ? (
                          <Button
                            disabled
                            variant="solid"
                            size="sm"
                            className="bg-green-600 text-white hover:bg-green-500"
                          >
                            Accepted
                          </Button>
                        ) : (
                          <Button
                            variant="solid"
                            size="sm"
                            className="bg-green-600 text-white hover:bg-green-500"
                            onClick={() =>
                              handleApplicationStatus(
                                "accepted",
                                applicant?._id
                              )
                            }
                          >
                            Accept
                          </Button>
                        )}
                        {/* For Rejection */}
                        {applicant.status === "rejected" ? (
                          <Button
                            disabled
                            variant="solid"
                            size="sm"
                            className="bg-red-600 text-white hover:bg-red-500"
                          >
                            Rejected
                          </Button>
                        ) : (
                          <Button
                            variant="solid"
                            size="sm"
                            className="bg-red-600 text-white hover:bg-red-500"
                            onClick={() =>
                              handleApplicationStatus(
                                "rejected",
                                applicant?._id
                              )
                            }
                          >
                            Reject
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Applicants;
