const { Schema, model } = require("mongoose");

const institutionSchema = new Schema({
  institutionName: { type: String, required: true },
  authorisedPersonalName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  officialEmailAddress: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  nirfRank: {
    type: Number,
    required: true,
  },
});

let institutionModel = model("Institution", institutionSchema);

module.exports = institutionModel;
