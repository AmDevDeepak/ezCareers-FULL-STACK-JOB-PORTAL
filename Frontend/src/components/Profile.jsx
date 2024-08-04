import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Download, Mail } from "lucide-react";
import AppliedJobs from "./AppliedJobs";
import { useState } from "react";
import UpdateProfileComponent from "./UpdateProfileComponent";
import { useSelector } from "react-redux";
import { capitalizeFirstLetter } from "../utils/constants.js";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
const Profile = () => {
  useGetAppliedJobs();
  const [openEditBox, setOpenEditBox] = useState(false);
  const { user } = useSelector((store) => store.auth);
  return (
    <div>
      <Navbar />
      <div className="w-full max-w-[85rem] mx-auto mt-5">
        <div className="bg-muted rounded-t-lg p-6 flex items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user?.profile?.profilePhoto} />
          </Avatar>
          <div className="grid gap-1 flex-1">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">{user?.fullname}</h1>
              <Button
                onClick={() => setOpenEditBox(true)}
                className="bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Edit Profile
              </Button>
            </div>
            <p className="text-muted-foreground">
              {capitalizeFirstLetter(user?.role)}
            </p>
          </div>
        </div>
        <div className="bg-background rounded-b-lg p-6 grid gap-3">
          <section>
            <h2 className="text-lg font-semibold">Bio</h2>
            <div className="grid">
              <div className="flex items-center justify-between">
                <div className="font-medium text-muted-foreground">
                  {user?.profile?.bio}
                </div>
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-lg font-semibold">Contact Info</h2>
            <div className="grid">
              <div className="flex justify-center gap-2 flex-col mt-1">
                <div className="font-medium text-muted-foreground flex items-center gap-2">
                  <Mail /> {user?.email}
                </div>
                <div className="font-medium text-muted-foreground flex items-center gap-2">
                  <Contact /> {user?.phoneNumber}
                </div>
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-lg font-semibold mt-2">Skills</h2>
            <div className="flex flex-wrap gap-2 mt-2 text-white">
              {user?.profile?.skills.length >= 1 ? (
                user?.profile?.skills.map((item, idx) => (
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
                <a href={user?.profile?.resume} target="blank" className="">
                  {user?.profile?.resumeOriginalName}
                </a>
              </div>
            </div>
          </section>

          {/* Applied Jobs Will Display here.. */}
          <AppliedJobs />
        </div>
      </div>
      <UpdateProfileComponent open={openEditBox} setOpen={setOpenEditBox} />
    </div>
  );
};

export default Profile;
