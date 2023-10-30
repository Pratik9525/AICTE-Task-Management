const router = require("express").Router();
const { User } = require("../../models/UserModel");
const _ = require("lodash");

//Get all users
router.get("/", async (req, res) => {
  try {
    let users = await User.find({});
    if (users.length > 0) {
      res.json({ data: users, success: true });
    } else {
      res.json({
        message: "No users exists in the database",
        success: false,
      });
    }
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
});

//Get any user by id
router.get("/:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    user
      ? res.json({ success: true, body: user })
      : res.json({ success: false, message: "User does not exist" });
  } catch (error) {
    res.json({ success: false, message: "Invalid user id entered" });
  }
});

//Delete any user by id
router.delete("/:userId", async (req, res) => {
  try {
    if (!req.params.userId) {
      res.json({ success: false, message: "user id is missing" });
    }

    await User.deleteOne({ _id: req.params.userId });
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

//Delete all the users
router.delete("/", async (req, res) => {
  try {
    await User.deleteMany({});
    res.json({ success: true, message: "All users deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

module.exports = router;
