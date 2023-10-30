const { ObjectId } = require("mongodb");
const { Schema, model } = require("mongoose");

const applicationSchema = new Schema({
  applicant: {
    type: ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    default: "pending",
    enum: ["approved", "pending", "reverted"],
  },
  scheme: {
    type: ObjectId,
    ref: "Scheme",
    required: true,
  },
});

module.exports = model("DocumentVerificationApplication", applicationSchema);
