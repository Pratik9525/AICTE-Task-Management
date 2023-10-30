const router = require("express").Router();
const { Admin } = require("../../models/UserModel");

//Get all admins
router.get("/", async (req, res) => {
  let admins = req.body?.filter
    ? await Admin.find(req.body.filter)
    : await Admin.find({});

  let adminsArray = [];
  if (admins.length > 0) {
    admins.map((admin) => {
      adminsArray.push(admin);
    });
    res.json({
      body: { items: adminsArray, count: admins.length },
      success: true,
    });
  } else {
    res.json({ success: false, message: "No admins exist in the database" });
  }
});

//Update admin by ID
router.put("/:adminId", async (req, res) => {
  try {
    if (!req.params.adminId) {
      res.json({ success: false, message: "admin Id is missing" });
      return;
    }
    let admin = await Admin.findById(req.params.adminId);
    if (!admin) {
      res.json({ success: false, message: "admin does not exist" });
      return;
    }
    _.merge(admin, req.body);
    admin.updatedAt = new Date();
    await admin.save();
    res.json({ success: true, message: "admin updated succesfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

//Delete any admin by id
router.delete("/:adminId", async (req, res) => {
  try {
    if (!req.params.adminId) {
      res.json({ success: false, message: "admin id is missing" });
    }
    await Admin.deleteOne({ _id: req.params.adminId });
    res.json({ success: true, message: "admin deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

module.exports = router;
