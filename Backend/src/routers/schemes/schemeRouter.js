const Scheme = require("../../models/SchemeModel");
const Application = require("../../models/ApplicationModel");
const router = require("express").Router();
const _ = require("lodash");

//Get all the schemes
router.get("/", async (req, res) => {
  try {
    let schemes;
    schemes = req.query
      ? await Scheme.find(req.query).populate("department")
      : await Scheme.find({}).populate("department");
    if (schemes.length > 0) {
      let schemesArray = [];
      schemes.map((scheme) => {
        schemesArray.push(scheme);
      });
      res.send({ body: schemesArray, success: true });
    } else {
      res.json({ success: false, message: "No schemes exist in the database" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

//Get all the schemes whose applications are pending or approved or reverted
router.get("/applications", async (req, res) => {
  try {
    if (!req.query.userRole) {
      req.json({ success: false, message: "user role is missing" });
    }

    let masterStatus =
      req.query.userRole == "departmentAdmin"
        ? "departmentAdminStatus"
        : "adminStatus";

    let applications = req.query.status
      ? await Application.find({ [masterStatus]: req.query.status }).populate({
          path: "scheme",
          //select: "schemeName department type",
        })
      : await Application.find({}).populate({
          path: "scheme",
          //select: `schemeName department type ${masterStatus}`,
        });

    let schemes = [];
    let counter = {};

    applications.map((application) => {
      counter[application.scheme._id] = counter[application.scheme._id]
        ? counter[application.scheme._id]
        : 0;
      counter[application.scheme._id] = counter[application.scheme._id] + 1;
      if (req.query.departmentId) {
        application.scheme.department == req.query.departmentId &&
          schemes.push(application.scheme);
      } else {
        schemes.push(application.scheme);
      }
    });

    schemes = _.uniq(schemes, schemes._id);

    res.json({
      success: true,
      body: { items: schemes, count: schemes.length, counter: counter },
    });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
});

//Create new scheme
router.post("/", async (req, res) => {
  try {
    let scheme = new Scheme(req.body);
    await scheme.save();
    res.json({
      success: true,
      message: "Scheme added succesfully",
      id: scheme._id,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

//Get scheme by ID
router.get("/:schemeID", async (req, res) => {
  try {
    let scheme = await Scheme.findById(req.params.schemeID);
    scheme
      ? res.json({ success: true, body: scheme })
      : res.json({ success: false, message: "Scheme does not exist" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

//Update scheme by ID
router.put("/:schemeID", async (req, res) => {
  try {
    if (!req.params.schemeID) {
      res.json({ success: false, message: "Scheme Id is missing" });
      return;
    }
    let scheme = await Scheme.findById(req.params.schemeID);
    _.merge(scheme, req.body);
    scheme.updatedAt = new Date();
    await scheme.save();
    res.json({ success: true, message: "Scheme updated succesfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

//Delete scheme by id
router.delete("/:schemeId", async (req, res) => {
  try {
    if (!req.params.schemeId) {
      res.json({ success: false, message: "scheme Id is missing" });
      return;
    }
    await Scheme.deleteOne({ id: req.params.schemeId });
    res.json({ success: true, message: "Scheme deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

//Delete all schemes
router.delete("/", async (req, res) => {
  try {
    await Scheme.deleteMany({});
    res.json({ success: true, message: "All schemes deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

module.exports = router;
