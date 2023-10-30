const express = require("express");
const app = express();
const cors = require("cors");
const connectWithDB = require("./connectDB");
const universalAuthenticationRouter = require("./routers/authentication/authenticate");
const applicantAuthenticationRouter = require("./routers/authentication/applicant");
const departmentAuthenticationRouter = require("./routers/authentication/departmentAdmin");
const adminAuthenticationRouter = require("./routers/authentication/admin");
const usersRouter = require("./routers/users/usersRouter");
const applicantsRouter = require("./routers/users/applicantsRouter");
const departmentAdminsRouter = require("./routers/users/departmentAdminRouter");
const adminsRouter = require("./routers/users/adminsRouter");
const schemeRouter = require("./routers/schemes/schemeRouter");
const departmentRouter = require("./routers/department/departmentRouter");
const applicationsRouter = require("./routers/applications/application");
const institutionsRouter = require("./routers/institution/institutionRouter");
const uploadRouter = require("./routers/documentsUpload/upload");
const institutionAdminRouter = require("./routers/authentication/institutionAdmin");

app.use(cors());
app.use(express.json());
app.set("json spaces", 3);
app.use("/authenticate", universalAuthenticationRouter);
app.use("/authenticate/institutionAdmin", institutionAdminRouter);
app.use("/authenticate/applicant", applicantAuthenticationRouter);
app.use("/authenticate/departmentAdmin", departmentAuthenticationRouter);
app.use("/authenticate/admin", adminAuthenticationRouter);
app.use("/users/applicants", applicantsRouter);
app.use("/users/departmentadmins", departmentAdminsRouter);
app.use("/users/admins", adminsRouter);
app.use("/users", usersRouter);
app.use("/schemes", schemeRouter);
app.use("/departments", departmentRouter);
app.use("/applications", applicationsRouter);
app.use("/institutions", institutionsRouter);
app.use("/", uploadRouter);

app.get("/", (req, res) => {
  res.send({ success: true, message: "The server is up and running" });
});

app.get("*", (req, res) => {
  res.status(404).send({ message: "This route does not exist" });
});

connectWithDB(app);
