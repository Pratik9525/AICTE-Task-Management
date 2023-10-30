const { ObjectID } = require("bson");
const { Schema, model } = require("mongoose");

const schemeSchema = new Schema({
  schemeName: { type: String, required: true },
  department: {
    type: ObjectID,
    ref: "Department",
    required: true,
  },
  type: {
    type: String,
    required: true,
    lowercase: true,
    enum: ["scholarship", "freeship", "vc", "fellowship", "training"],
  },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  stakeholder: {
    type: String,
    required: true,
    lowercase: true,
    enum: ["student", "faculty"],
  },
  eligibility: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
    required: true,
  },
});

let schemeModel = model("Scheme", schemeSchema);

module.exports = schemeModel;
