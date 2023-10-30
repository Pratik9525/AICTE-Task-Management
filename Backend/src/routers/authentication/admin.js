const router = require("express").Router();
const { Admin } = require("../../models/UserModel");

//Admin registration
router.post("/register", async (req, res) => {
  try {
    if (req.body) {
      let applicant = await Admin.findOne({
        username: req.body.username,
      });
      if (applicant) {
        res.json({
          success: false,
          message: "An user with the same email address already exists",
        });
        return;
      }
      let user = new Admin({
        username: req.body.username,
        password: req.body.password,
      });
      await user.save();
      let userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
      res.json({ success: true, body: userWithoutPassword });
    } else {
      res.json({
        successs: false,
        message: "User id is either missing or invalid",
      });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

//Login a admin
router.post("/login", async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      res.json({ success: false, message: "Username or password is missing" });
      return;
    }
    let user = await Admin.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    user
      ? res.json({ success: true, body: user })
      : res.json({
          success: false,
          message: "Incorrect username or password entered",
        });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

module.exports = router;
