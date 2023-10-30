const { ObjectId } = require("mongodb");
const { Schema, model } = require("mongoose");

const applicationSchema = new Schema({
  applicant: { type: ObjectId, ref: "User", required: true },
  departmentAdminStatus: {
    type: String,
    default: "pending",
    enum: ["pending", "rejected", "reverted", "approved"],
  },
  adminStatus: {
    default: "null",
    type: String,
    enum: ["null", "pending", "rejected", "reverted", "approved"],
  },
  studentStatus: {
    default: "pending",
    type: String,
    enum: ["pending", "rejected", "reverted", "approved"],
  },
  scheme: {
    type: ObjectId,
    ref: "Scheme",
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
    required: true,
  },
  applicationHolder: {
    default: "departmentAdmin",
    type: String,
    enum: ["departmentAdmin", "admin", "applicant"],
  },
});

module.exports = model("Application", applicationSchema);
