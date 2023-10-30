const router = require("express").Router();
const { Applicant } = require("../../models/UserModel");
const bcrypt = require("bcrypt");

//Applicant registration
router.post("/register", async (req, res) => {
  let applicant = await Applicant.findOne({ username: req.body.username });
  if (applicant) {
    res.json({
      success: false,
      message: "An user with the same email address already exists",
    });
    return;
  }

  let payload = req.body;
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      res.json({ success: false, message: err.message });
    }
    bcrypt.hash(payload.password, salt, async function (err, hash) {
      try {
        if (err) {
          res.json({ success: false, message: err.message });
        }
        payload.password = hash;

        let user = new Applicant(payload);
        await user.save();
        let userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;
        res.json({ success: true, body: userWithoutPassword });
      } catch (error) {
        res.json({ message: error.message, success: true });
      }
    });
  });
});

//Validate an applicant
router.post("/validate", async (req, res) => {
  try {
    if (!req.body.username) {
      res.json({ success: false, message: "username is missing" });
      return;
    }
    let applicant = await Applicant.findOne({ username: req.body.username });

    applicant
      ? res.json({
          success: false,
          message: "An applicant with the same email address already exists",
        })
      : res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

//Login an applicant
router.post("/login", async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      res.json({ success: false, message: "Username or password is missing" });
      return;
    }
    let user = await Applicant.findOne({
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

//Update user account password
router.put("/update-password", async (req, res) => {
  try {
    let user = await User.findById(req.body.userId).select("+password");
    if (req.body.currentPassword && user.password == req.body.currentPassword) {
      user.password = req.body.newPassword;
      await user.save();
      res.json({
        success: true,
        message: "The password has been updated successfully",
      });
    } else {
      res.json({
        success: false,
        message: "The current password is either missing or incorrect",
      });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

module.exports = router;
