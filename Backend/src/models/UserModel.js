const { ObjectId } = require("mongodb");
const { model, Schema } = require("mongoose");

const applicantSchema = new Schema({
  firstName: {
    required: true,
    type: String,
  },
  applications: [{ type: ObjectId, ref: "Application" }],
  lastName: {
    required: true,
    type: String,
  },
  gender: {
    required: true,
    type: String,
    enum: ["male", "female", "other"],
  },
  phoneNo: {
    required: true,
    type: Number,
  },
  applicantType: {
    required: true,
    type: String,
    enum: ["student", "faculty"],
  },
  instituteName: {
    type: String,
  },
  yearOfStudy: {
    type: String,
    enum: ["I", "II", "III", "IV", "V", "VI"],
  },
  yearOfPassout: {
    type: Number,
  },
  departmentName: {
    type: String,
  },
  yearsOfExperience: {
    type: Number,
  },
  designation: {
    type: String,
  },
});

const departmentAdminSchema = new Schema({
  department: {
    type: ObjectId,
    required: true,
    ref: "Department",
  },
  role: {
    default: "departmentAdmin",
    type: String,
  },
});

const institutionAdminSchema = new Schema({
  institution: {
    type: ObjectId,
    required: true,
    ref: "Institution",
  },
  role: {
    default: "institutionAdmin",
    type: String,
  },
});

const adminSchema = new Schema({
  role: {
    default: "admin",
    type: String,
  },
});

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  role: {
    type: String,
    default: "applicant",
  },
  password: { type: String, select: false, required: true, trim: true },
});

let User = model("User", userSchema);
let Admin = User.discriminator("Admin", adminSchema);
let Applicant = User.discriminator("Applicant", applicantSchema);
let DepartmentAdmin = User.discriminator(
  "DepartmentAdmin",
  departmentAdminSchema
);
let InstitutionAdmin = User.discriminator(
  "InstitutionAdmin",
  institutionAdminSchema
);

module.exports = { User, Applicant, DepartmentAdmin, Admin, InstitutionAdmin };
