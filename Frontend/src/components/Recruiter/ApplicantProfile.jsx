import { APPLICATION_API_ENDPOINTS, capitalizeFirstLetter } from "@/utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Contact, Download, Mail } from "lucide-react";

const ApplicantProfile = () => {
  const params = useParams();
  const applicantId = params.applicantId;

  const [applicant, setApplicant] = useState(null);
  //console.log(applicant);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const response = await axios.get(
          `${APPLICATION_API_ENDPOINTS}/${applicantId}/profile`,
          { withCredentials: true }
        );
        if (response.data.success) {
          setApplicant(response.data.applicant);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, [applicantId]);
  return (
    <div>
      <Navbar />
      <div className="w-full max-w-[85rem] mx-auto mt-5">
        <div className="bg-muted rounded-t-lg p-6 flex items-center gap-6">
          <Avatar className="h-[5.5rem] w-[5.5rem]">
            <AvatarImage src={applicant?.profile?.profilePhoto} className="w-full h-full object-cover rounded-full" />
          </Avatar>
          <div className="grid gap-1 flex-1">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">{applicant?.fullname}</h1>
            </div>
            <p className="text-muted-foreground">
              {capitalizeFirstLetter(applicant?.role)}
            </p>
          </div>
        </div>
        <div className="bg-background rounded-b-lg p-6 grid gap-3">
          <section>
            <h2 className="text-lg font-semibold">Bio</h2>
            <div className="grid">
              <div className="flex items-center justify-between">
                <div className="font-medium text-muted-foreground">
                  {applicant?.profile?.bio}
                </div>
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-lg font-semibold">Contact Info</h2>
            <div className="grid">
              <div className="flex justify-center gap-2 flex-col mt-1">
                <div className="font-medium text-muted-foreground flex items-center gap-2">
                  <Mail /> {applicant?.email}
                </div>
                <div className="font-medium text-muted-foreground flex items-center gap-2">
                  <Contact /> {applicant?.phoneNumber}
                </div>
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-lg font-semibold mt-2">Skills</h2>
            <div className="flex flex-wrap gap-2 mt-2 text-white">
              {applicant?.profile?.skills.length >= 1 ? (
                applicant?.profile?.skills.map((item, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-2 rounded-full bg-muted-foreground px-3 py-1 text-md"
                  >
                    {item}
                  </div>
                ))
              ) : (
                <p>No skills added.</p>
              )}
            </div>
          </section>

          <section className="my-3">
            <h2 className="text-lg font-semibold">Resume</h2>
            <div className="grid">
              <div className="font-medium text-muted-foreground flex items-center gap-2">
                <Download />
                <a href={applicant?.profile?.resume} target="blank" className="">
                  {applicant?.profile?.resumeOriginalName || 'Not available'}
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ApplicantProfile;
