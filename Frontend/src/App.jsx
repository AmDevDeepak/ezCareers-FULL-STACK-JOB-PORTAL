import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Explore from "./components/Explore";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/Recruiter/Companies";
import CreateCompany from "./components/Recruiter/CreateCompany";
import CompanyProfile from "./components/Recruiter/CompanyProfile";
import RecruiterJobs from "./components/Recruiter/RecruiterJobs";
import PostJob from "./components/Recruiter/PostJob";
import Applicants from "./components/Recruiter/Applicants";
import ApplicantProfile from "./components/Recruiter/ApplicantProfile";
import ProtectRecruiterRoutes from "./components/Recruiter/ProtectRecruiterRoutes";
import NotFoundPage from "./components/NotFoundPage"; // Import the NotFoundPage component

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/description/:id",
    element: <JobDescription />,
  },
  {
    path: "/explore",
    element: <Explore />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },

  // Routes for a recruiter
  {
    path: "/recruiter/companies",
    element: (
      <ProtectRecruiterRoutes>
        <Companies />
      </ProtectRecruiterRoutes>
    ),
  },
  {
    path: "/recruiter/company/create",
    element: (
      <ProtectRecruiterRoutes>
        <CreateCompany />
      </ProtectRecruiterRoutes>
    ),
  },
  {
    path: "/recruiter/company/:id",
    element: (
      <ProtectRecruiterRoutes>
        <CompanyProfile />
      </ProtectRecruiterRoutes>
    ),
  },
  {
    path: "/recruiter/jobs",
    element: (
      <ProtectRecruiterRoutes>
        <RecruiterJobs />
      </ProtectRecruiterRoutes>
    ),
  },
  {
    path: "/recruiter/jobs/create",
    element: (
      <ProtectRecruiterRoutes>
        <PostJob />
      </ProtectRecruiterRoutes>
    ),
  },
  {
    path: "/recruiter/jobs/:id/applicants",
    element: (
      <ProtectRecruiterRoutes>
        <Applicants />
      </ProtectRecruiterRoutes>
    ),
  },
  {
    path: "/recruiter/jobs/:jobId/applicants/:applicantId/profile",
    element: (
      <ProtectRecruiterRoutes>
        <ApplicantProfile />
      </ProtectRecruiterRoutes>
    ),
  },

  // Page not found
  {
    path: "*", 
    element: <NotFoundPage />, 
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
