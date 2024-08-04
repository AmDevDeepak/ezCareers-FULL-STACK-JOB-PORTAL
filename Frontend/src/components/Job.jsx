import moment from "moment";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Job = ({ job }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  return (
    <div>
      <Card className="w-full max-w-md bg-card text-card-foreground shadow-md">
        <div className="flex items-center justify-between px-6 pt-6">
          <div className="flex items-center gap-4">
            <Avatar className="border">
              <AvatarImage src={job?.company?.logo} />
            </Avatar>
            <div>
              <p className="text-sm font-medium">{job?.company?.name}</p>
              <p className="text-xs text-muted-foreground">
                {moment(job?.createdAt).fromNow()}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <BookmarkIcon className="h-5 w-5" />
            <span className="sr-only">Bookmark job</span>
          </Button>
        </div>
        <CardContent className="px-6 pt-4 pb-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">{job?.title}</h3>
            <div className="flex flex-wrap gap-2 my-2">
              <Badge>{job?.position} Positions</Badge>
              <Badge>{job?.jobType}</Badge>
              <Badge>{job?.salary} LPA</Badge>
            </div>
            <p className="text-muted-foreground">
              <span className="text-muted-foreground">
                Job Description & Requirements :
              </span>{" "}
              {job?.description.split(" ").splice(0, 15).join(" ")}...
            </p>
          </div>
          {user ? (
            <Button
              onClick={() => navigate(`/description/${job._id}`)}
              className="mt-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              See Details
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              className="mt-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Login to see
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

function BookmarkIcon() {
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
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
}

export default Job;
