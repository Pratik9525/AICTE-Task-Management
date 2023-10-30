const router = require("express").Router();
const { DepartmentAdmin, Applicant } = require("../../models/UserModel");

const bcrypt = require("bcrypt");
//const { Admin } = require("../../models/UserModel");

//Admin registration
// router.post("/register", async (req, res) => {
//   try {
//     if (req.body) {
//       let applicant = await Admin.findOne({
//         username: req.body.username,
//       });
//       if (applicant) {
//         res.json({
//           success: false,
//           message: "An user with the same email address already exists",
//         });
//         return;
//       }
//       let user = new Admin({
//         username: req.body.username,
//         password: req.body.password,
//       });
//       await user.save();
//       let userWithoutPassword = user.toObject();
//       delete userWithoutPassword.password;
//       res.json({ success: true, body: userWithoutPassword });
//     } else {
//       res.json({
//         successs: false,
//         message: "User id is either missing or invalid",
//       });
//     }
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// });

//Login an admin
router.post("/login", async (req, res) => {
  try {
    let username = req.body.username;
    let domain = username.split("@")[1];
    if (
      username == "institution@gmail.com" &&
      req.body.password == "institution"
    ) {
      res.json({
        body: { username: "institute@gmail.com", role: "departmentAdmin" },
        success: true,
      });
      return;
    }
    //Admin Login
    if (domain == "aicte-india.org" && req.body.password == "aicte") {
      res.send({ body: { role: "admin", username: username }, success: true });
    } else if (domain == "aicte.org") {
      //Department Login
      if (username == "institution@gmail.com") {
        res.json({
          body: { role: "departmentAdmin", username: "institution@gmail.com" },
        });
      }
      let departmentAdmin = await DepartmentAdmin.findOne({
        username: req.body.username,
      }).populate("department");
      departmentAdmin
        ? res.json({ success: true, body: departmentAdmin })
        : res.json({
            success: false,
            message: "Incorrect username or password entered",
          });
    } else {
      let user = await Applicant.findOne({
        username: req.body.username,
      }).select("+password");

      user
        ? bcrypt.compare(
            req.body.password,
            user.password,
            function (err, result) {
              if (err) {
                res.json({ message: err.message, success: false });
                return;
              }

              user = user.toObject();
              delete user.password;

              result
                ? res.json({ success: true, body: user })
                : res.json({
                    success: false,
                    message: "Incorrect username or password entered",
                  });
              // result == true
            }
          )
        : res.json({
            success: false,
            message: "Incorrect username or password entered",
          });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

module.exports = router;
