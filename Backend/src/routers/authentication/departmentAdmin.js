const router = require("express").Router();
const { DepartmentAdmin } = require("../../models/UserModel");

//Department admin registration
router.post("/register", async (req, res) => {
  try {
    if (req.body) {
      let applicant = await DepartmentAdmin.findOne({
        username: req.body.username,
      });
      if (applicant) {
        res.json({
          success: false,
          message:
            "A department admin with the same email address already exists",
        });
        return;
      }
      let departmentAdmin = new DepartmentAdmin({
        username: req.body.username,
        password: req.body.password,
        department: req.body.departmentId,
      });
      await departmentAdmin.save();
      let departmentAdminWithoutPassword = departmentAdmin.toObject();
      delete departmentAdminWithoutPassword.password;
      res.json({ success: true, body: departmentAdminWithoutPassword });
    } else {
      res.json({
        successs: false,
        message: "department admin id is either missing or invalid",
      });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

//Login a department admin
router.post("/login", async (req, res) => {
  try {
    if (!req.body.departmentAdminname || !req.body.password) {
      res.json({
        success: false,
        message: "username or password is missing",
      });
      return;
    }
    let departmentAdmin = await DepartmentAdmin.findOne({
      username: req.body.departmentAdminname,
      password: req.body.password,
    });

    departmentAdmin
      ? res.json({ success: true, body: departmentAdmin })
      : res.json({
          success: false,
          message: "Incorrect username or password entered",
        });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

module.exports = router;
