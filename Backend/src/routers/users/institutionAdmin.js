const router = require("express").Router();
const { InstitutionAdmin } = require("../../models/UserModel");

//Get all departmentAdmins
router.get("/", async (req, res) => {
  let departmentAdmins = req.body.filter
    ? await InstitutionAdmin.find(req.body.filter)
    : await InstitutionAdmin.find({});

  let departmentAdminsArray = [];
  if (departmentAdmins.length > 0) {
    departmentAdmins.map((departmentAdmin) => {
      departmentAdminsArray.push(departmentAdmin);
    });
    res.json({
      body: { items: departmentAdminsArray, count: departmentAdmins.length },
      success: true,
    });
  } else {
    res.json({
      success: false,
      message: "No department admins exist in the database",
    });
  }
});

//Update departmentAdmin by ID
router.put("/:departmentAdminId", async (req, res) => {
  try {
    if (!req.params.departmentAdminId) {
      res.json({ success: false, message: "department admin Id is missing" });
      return;
    }
    let departmentAdmin = await InstitutionAdmin.findById(
      req.params.departmentAdminId
    );
    if (!departmentAdmin) {
      res.json({ success: false, message: "department admin does not exist" });
      return;
    }
    _.merge(departmentAdmin, req.body);
    departmentAdmin.updatedAt = new Date();
    await departmentAdmin.save();
    res.json({
      success: true,
      message: "department admin updated succesfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

//Delete any departmentAdmin by id
router.delete("/:departmentAdminId", async (req, res) => {
  try {
    if (!req.params.departmentAdminId) {
      res.json({ success: false, message: "department admin id is missing" });
    }
    await InstitutionAdmin.deleteOne({ _id: req.params.departmentAdminId });
    res.json({
      success: true,
      message: "department admin deleted successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

module.exports = router;
