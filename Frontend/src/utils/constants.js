// API endpoints
// export const USER_API_ENDPOINTS = "http://localhost:3000/api/v1/user";
// export const JOB_API_ENDPOINTS = "http://localhost:3000/api/v1/job";
// export const APPLICATION_API_ENDPOINTS =
//   "http://localhost:3000/api/v1/application";
// export const COMPANY_API_ENDPOINTS = "http://localhost:3000/api/v1/company";

const baseUrl = "https://ezcareers-backend.onrender.com";
export const USER_API_ENDPOINTS = `${baseUrl}/api/v1/user`;
export const JOB_API_ENDPOINTS = `${baseUrl}/api/v1/job`;
export const APPLICATION_API_ENDPOINTS = `${baseUrl}/api/v1/application`;
export const COMPANY_API_ENDPOINTS = `${baseUrl}/api/v1/company`;

export const categories = [
  { id: 0, value: "MERN Stack Developer" },
  { id: 1, value: "Frontend Developer" },
  { id: 2, value: "Full Stack Developer" },
  { id: 3, value: "Backend Developer" },
  { id: 4, value: "Data Scientist" },
  { id: 5, value: "Product Manager" },
  { id: 6, value: "UI/UX Designer" },
  { id: 7, value: "NodeJS Developer" },
];

export const filterData = [
  {
    filterType: "Location",
    list: ["Delhi NCR", "Hisar", "Gurugram", "Hydrabad", "Mumbai", "Gurgaon"],
  },
  {
    filterType: "Roles",
    list: [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Web Developer",
      "ReactJs Developer",
    ],
  },
];

export const capitalizeFirstLetter = (str) => {
  if (str) return str.charAt(0).toUpperCase() + str.slice(1);
  else return null;
};

export const findTotalMatchingSkills = (skillsObj, requirementText) => {
  if (skillsObj && requirementText) {
    let skillsArr = Object.values(skillsObj);
    skillsArr = skillsArr.map((skill) => skill.toLowerCase());
    let requirementTextLowerCase = requirementText
      .toLowerCase()
      .replace(/[^a-zA-Z0-9, ]/g, " ");
    const requirementSet = new Set(requirementTextLowerCase.split(/[\s,]+/));
    const matchedSkills = skillsArr.filter((skill) =>
      requirementSet.has(skill)
    );
    return matchedSkills.length;
  }
  return "NA";
};
