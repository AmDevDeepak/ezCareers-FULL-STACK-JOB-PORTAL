import React from "react";
import { Card, CardContent } from "./ui/card";
import { BriefcaseIcon, DollarSignIcon, LocateIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const LatestJobCard = ({ job }) => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  return (
    <div>
      <Card>
        <CardContent className="space-y-4 mt-[0.7rem]">
          <div className="flex items-center gap-2">
            <div>
              <h3 className="text-lg font-medium">{job?.title}</h3>
              <div className="flex flex-wrap gap-2 my-2">
                <Badge>{job?.position} Positions</Badge>
                <Badge>{job?.jobType}</Badge>
              </div>
              <p className="text-muted-foreground">{job?.company?.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <LocateIcon className="h-5 w-5" />
            <span>{job?.company?.location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <BriefcaseIcon className="h-5 w-5" />
            <span>{job?.jobType}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <DollarSignIcon className="h-5 w-5" />
            <span>{job?.salary} LPA</span>
          </div>
          {user ? (
            <Button
              onClick={() => navigate(`/description/${job._id}`)}
              className="w-full bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Explore more details
            </Button>
          ) : (
              <Button onClick={() => navigate('/login')}
              className="w-full bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Login to see more details
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LatestJobCard;
