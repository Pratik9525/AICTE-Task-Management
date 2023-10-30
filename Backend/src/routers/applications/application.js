const Application = require("../../models/ApplicationModel");
const { Applicant } = require("../../models/UserModel");
const router = require("express").Router();

//Get all the applications
router.get("/", async (req, res) => {
  try {
    let applications = req.query
      ? await Application.find(req.query)
          .populate("applicant")
          .populate({
            path: "scheme",
            select: "schemeName departmentName type",
            populate: {
              path: "department",
              model: "Department",
            },
          })
      : await Application.find({})
          .populate("applicant")
          .populate({
            path: "scheme",
            select: "schemeName departmentName type",
            populate: {
              path: "department",
              model: "Department",
            },
          });

    res.json({
      success: true,
      body: { items: applications, count: applications.length },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

//Get all the applications by an applicant
router.get("/applicant", async (req, res) => {
  try {
    if (!req.query.userId) {
      res.json({ success: false, message: "User id is missing" });
      return;
    }
    let applications = await Application.find({
      applicant: req.query.userId,
    }).populate("scheme", "schemeName departmentName type");
    res.json({
      success: true,
      body: { item: applications, count: applications.length },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

//Get all the applications under a scheme
router.get("/scheme", async (req, res) => {
  try {
    if (!req.query.schemeId || !req.query.userRole) {
      res.json({ success: false, message: "Scheme id or userRole is missing" });
      return;
    }
    let masterStatus =
      req.query.userRole == "departmentAdmin"
        ? "departmentAdminStatus"
        : "adminStatus";

    let filterA = {
      scheme: { _id: req.query.schemeId },
      [masterStatus]: req.query.status,
    };
    let filterB = {
      scheme: { _id: req.query.schemeId },
    };

    let applications = req.query.status
      ? await Application.find({})
          .populate("scheme", "schemeName departmentName type")
          .populate("applicant")
          .find(filterA)
      : await Application.find({})
          .populate("scheme", "schemeName departmentName type")
          .populate("applicant")
          .find(filterB);

    res.json({
      success: true,
      body: { item: applications, count: applications.length },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

//Create new application
router.post("/", async (req, res) => {
  try {
    if (!req.body.applicantId || !req.body.schemeId) {
      res.json({
        success: false,
        message: "ApplicantId or schemeId is missing",
      });
      return;
    }

    let applicant = await Applicant.findById(req.body.applicantId).populate(
      "applications"
    );

    if (
      applicant.applications.find((item) => item.scheme == req.body.schemeId)
    ) {
      res.json({
        success: false,
        message:
          "You have already submitted the application for the selected scheme",
      });
      return;
    }

    let application = new Application({
      applicant: req.body.applicantId,
      scheme: req.body.schemeId,
      createdAt: req.body.createdAt,
    });
    await application.save();

    applicant.applications.push(application._id);
    if (!applicant.instituteName && applicant.applicantType == "student") {
      applicant.instituteName = req.body.additionalInput.instituteName;
      applicant.yearOfStudy = req.body.additionalInput.yearOfStudy;
      applicant.yearOfPassout = Number(req.body.additionalInput.yearOfPassout);
    }

    if (!applicant.instituteName && applicant.applicantType == "faculty") {
      applicant.instituteName = req.body.additionalInput.instituteName;
      applicant.departmentName = req.body.additionalInput.departmentName;
      applicant.yearsOfExperience = Number(
        req.body.additionalInput.yearsOfExperience
      );
      applicant.designation = req.body.additionalInput.designation;
    }
    await applicant.save();
    res.json({
      success: true,
      message: "The application has been submitted successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

//Approve or revert back to the applicant
router.post("/action", async (req, res) => {
  try {
    if (!req.body.applicationId || !req.body.adminRole || !req.body.action) {
      res.json({
        message: "application Id or adminRole or action is missing",
        success: false,
      });
      return;
    }

    let application = await Application.findById(req.body.applicationId);
    if (req.body.adminRole == "departmentAdmin") {
      if (req.body.action == "approved") {
        application.departmentAdminStatus = req.body.action;
        application.adminStatus = "pending";
      } else if (req.body.action == "reverted") {
        application.departmentAdminStatus = "reverted";
        application.studentStatus = "reverted";
      }
    } else if (req.body.adminRole == "admin") {
      if (req.body.action == "approved") {
        application.adminStatus = "approved";
        application.studentStatus = "approved";
      } else if (req.body.action == "reverted") {
        application.adminStatus = "reverted";
        application.studentStatus = "reverted";
      }
    }
    application.save();
    res.json({ success: true, message: "application status has been updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

//Delete all applications
router.delete("/", async (req, res) => {
  try {
    await Application.deleteMany({});
    await Applicant.find({}).updateMany({}, { applications: [] });
    res.json({
      success: true,
      message: "All applications deleted successfully",
    });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
});

//Admin Dashboard statistics
router.get("/statistics", async (req, res) => {
  try {
    let masterStatus =
      req.query.userRole == "departmentAdmin"
        ? "departmentAdminStatus"
        : "adminStatus";

    let applications = await Application.find({}).populate({
      path: "scheme",
      select: "schemeName department type",
      populate: {
        path: "department",
        model: "Department",
      },
    });
    if (req.query.departmentId && req.query.departmentId != "undefined") {
      applications = applications.filter((application) => {
        return application.scheme.department._id == req.query.departmentId;
      });
    }

    let totalApplicationsCount = applications.length;
    let approvedApplicationsCount = 0,
      revertedApplicationsCount = 0,
      pendingApplicationsCount = 0;

    applications.map((item) => {
      item[masterStatus] == "pending" && pendingApplicationsCount++;
      item[masterStatus] == "approved" && approvedApplicationsCount++;
      item[masterStatus] == "reverted" && revertedApplicationsCount++;
    });

    let countStatistics = {
      totalApplicationsCount,
      approvedApplicationsCount,
      revertedApplicationsCount,
      pendingApplicationsCount,
    };

    res.json({ success: true, body: { countStatistics } });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
});

//Update admin by ID
router.put("/reapply", async (req, res) => {
  try {
    if (!req.query.applicantId) {
      res.json({ success: false, message: "applicant Id is missing" });
      return;
    }
    let applicant = await Applicant.findById(req.params.adminId);
    if (!applicant) {
      res.json({ success: false, message: "applicant does not exist" });
      return;
    }
    _.merge(applicant, req.body);

    await admin.save();
    res.json({ success: true, message: "admin updated succesfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

module.exports = router;
