import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "./config/serverConfig.js";
import connectToDB from "./config/db.js";
import userRouter from "./routes/user.route.js";
import companyRouter from "./routes/company.route.js";
import jobRouter from "./routes/job.route.js";
import applicationRouter from "./routes/application.route.js";

const PORT = config.PORT;
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "https://ezcareersfrontend-amdevdeepaks-projects.vercel.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

app.listen(PORT, () => {
  console.log("Server listening to", PORT);
  connectToDB();
});
