import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";

const AppliedJobs = () => {
  const acceptedClass = "bg-green-500 text-white";
  const rejectedClass = "bg-red-500 text-white";
  const pendingClass = "bg-gray-500 text-white";
  const { allAppliedJobs } = useSelector((store) => store.job);
  //console.log(allAppliedJobs);
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Job Applications</CardTitle>
        <CardDescription>
          View the status of your job applications.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Job Role</TableHead>
              <TableHead>Applied On</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allAppliedJobs.length === 0 ? (
              <p className="px-2 py-3 font-medium">No applied jobs yet.</p>
            ) : (
              allAppliedJobs.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">
                    {item?.job?.company?.name}
                  </TableCell>
                  <TableCell>{item?.job?.title}</TableCell>
                  <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
                  <TableCell>
                    <Badge
                      className={`${
                        item?.status === "accepted"
                          ? acceptedClass
                          : item?.status === "rejected"
                          ? rejectedClass
                          : pendingClass
                      }`}
                    >
                      {item?.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AppliedJobs;

{
  /* <TableRow>
  <TableCell className="font-medium">Stark Resilient</TableCell>
  <TableCell>UI/UX Designer</TableCell>
  <TableCell>2023-08-05</TableCell>
  <TableCell>
    <Badge variant="outline" className="bg-green-500 text-green-50">
      Accepted
    </Badge>
  </TableCell>
</TableRow>; */
}
