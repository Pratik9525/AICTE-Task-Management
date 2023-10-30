const { Schema, model } = require("mongoose");

const departmentSchema = new Schema({
  departmentName: { type: String, required: true },
  officialEmailAddress: {
    type: String,
    required: true,
  },
});

let departmentModel = model("Department", departmentSchema);

module.exports = departmentModel;
