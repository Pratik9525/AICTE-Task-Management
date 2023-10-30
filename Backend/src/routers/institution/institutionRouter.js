const Institution = require("../../models/InstitutionModel");
const router = require("express").Router();
const DocumentVerificationApplication = require("../../models/DocumentVerificationApplication");

//Get all the institutions
router.get("/", async (req, res) => {
  try {
    let institutions = await Institution.find({});
    let institutionsArray = [];
    if (institutions.length > 0) {
      institutions.map((institution) => {
        institutionsArray.push(institution);
      });
      res.send({ data: { items: institutionsArray }, success: true });
    } else {
      res.send({
        message: "No institutions exist in the database",
        success: false,
      });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.get("/applications", async (req, res) => {
  try {
    let applications = req.query
      ? await DocumentVerificationApplication.find(req.query).populate(
          "applicant"
        )
      : await DocumentVerificationApplication.find({}).populate("applicant");
    res.json({
      body: { items: applications, count: applications.length },
      success: true,
    });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
});

// //Get all the institutions whose applications are pending or approved or reverted
// router.get("/applications", async (req, res) => {
//   try {
//     let masterStatus =
//       req.query.userRole == "institutionAdmin"
//         ? "institutionAdminStatus"
//         : "adminStatus";

//     let applications = req.query.status
//       ? await Application.find({})
//           .populate("applicant")
//           .populate({
//             path: "scheme",
//             select: "schemeName institutionName type",
//             populate: {
//               path: "institution",
//               model: "Institution",
//             },
//           })
//           .find({ [masterStatus]: req.query.status })
//       : await Application.find({})
//           .populate("applicant")
//           .populate({
//             path: "scheme",
//             select: "schemeName institutionName type",
//             populate: {
//               path: "institution",
//               model: "Institution",
//             },
//           });

//     let institutions = [];
//     applications.map((application) => {
//       institutions.push(application.scheme.institution);
//     });
//     institutions = lodash.uniq(institutions, institutions._id);

//     res.json({
//       success: true,
//       body: { items: institutions, count: institutions.length },
//     });
//   } catch (error) {
//     res.json({ message: error.message, success: false });
//   }
// });

//Get institution by ID
router.get("/:institutionID", async (req, res) => {
  try {
    let institution = await Institution.findById(req.params.institutionID);
    institution
      ? res.json({ data: institution, success: true })
      : res.json({ message: "Institution does not exist", success: false });
  } catch (error) {
    res.json({ message: "Invalid institution id entered" });
  }
});

//Create new institution
router.post("/", async (req, res) => {
  try {
    let institution = new Institution({
      institutionName: req.body.institutionName,
    });
    await institution.save();
    res.json({
      message: "institution has been added successfully",
      success: true,
    });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
});

//Delete institution by id
router.delete("/:institutionId", async (req, res) => {
  try {
    await Institution.deleteOne({ id: req.params.institutionId });
    res.json({ message: "institution deleted successfully", success: true });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
});

//Delete all institutions
router.delete("/", async (req, res) => {
  try {
    await Institution.deleteMany({});
    res.json({
      message: "All institutions deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
});

module.exports = router;
