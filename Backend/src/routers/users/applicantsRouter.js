const router = require("express").Router();
const { Applicant } = require("../../models/UserModel");

//Get all applicants
router.get("/", async (req, res) => {
  let applicants = req.query
    ? await Applicant.find(req.query)
    : await Applicant.find({});

  let applicantsArray = [];
  if (applicants.length > 0) {
    applicants.map((applicant) => {
      applicantsArray.push(applicant);
    });
    res.json({
      body: { items: applicantsArray, count: applicants.length },
      success: true,
    });
  } else {
    res.json({
      success: false,
      message: "No applicants exist in the database",
    });
  }
});

//Update applicant by ID
router.put("/:applicantId", async (req, res) => {
  try {
    if (!req.params.applicantId) {
      res.json({ success: false, message: "Applicant Id is missing" });
      return;
    }
    let applicant = await Applicant.findById(req.params.applicantId);
    if (!applicant) {
      res.json({ success: false, message: "applicant does not exist" });
      return;
    }
    _.merge(applicant, req.body);
    applicant.updatedAt = new Date();
    await applicant.save();
    res.json({ success: true, message: "applicant updated succesfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

//Delete any applicant by id
router.delete("/:applicantId", async (req, res) => {
  try {
    if (!req.params.applicantId) {
      res.json({ success: false, message: "applicant id is missing" });
    }
    await Applicant.deleteOne({ _id: req.params.applicantId });
    res.json({ success: true, message: "applicant deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

module.exports = router;
