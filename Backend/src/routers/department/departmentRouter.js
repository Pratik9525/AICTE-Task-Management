const Department = require("../../models/DepartmentModel");
const Application = require("../../models/ApplicationModel");
const router = require("express").Router();
const lodash = require("lodash");

//Get all the departments
router.get("/", async (req, res) => {
  try {
    let departments = await Department.find({});
    let departmentsArray = [];
    if (departments.length > 0) {
      departments.map((department) => {
        departmentsArray.push(department);
      });
      res.send({ data: { items: departmentsArray }, success: true });
    } else {
      res.send({
        message: "No departments exist in the database",
        success: false,
      });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

//Get all the departments whose applications are pending or approved or reverted
router.get("/applications", async (req, res) => {
  try {
    let masterStatus =
      req.query.userRole == "departmentAdmin"
        ? "departmentAdminStatus"
        : "adminStatus";

    let applications = req.query.status
      ? await Application.find({})
          .populate("applicant")
          .populate({
            path: "scheme",
            select: "schemeName departmentName type",
            populate: {
              path: "department",
              model: "Department",
            },
          })
          .find({ [masterStatus]: req.query.status })
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

    let departments = [];
    let counter = {};
    applications.map((application) => {
      counter[application.scheme.department._id] = counter[
        application.scheme.department._id
      ]
        ? counter[application.scheme.department._id]
        : 0;
      counter[application.scheme.department._id] =
        counter[application.scheme.department._id] + 1;
      departments.push(application.scheme.department);
    });
    departments = lodash.uniq(departments, departments._id);

    res.json({
      success: true,
      body: { items: departments, count: departments.length, counter: counter },
    });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
});

//Get department by ID
router.get("/:departmentID", async (req, res) => {
  try {
    let department = await Department.findById(req.params.department);
    department
      ? res.json({ data: department, success: true })
      : res.json({ message: "Department does not exist", success: false });
  } catch (error) {
    res.json({ message: "Invalid department id entered" });
  }
});

//Create new department
router.post("/", async (req, res) => {
  try {
    let department = new Department({
      departmentName: req.body.departmentName,
    });
    await department.save();
    res.json({
      message: "department has been added successfully",
      success: true,
    });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
});

//Delete department by id
router.delete("/:departmentId", async (req, res) => {
  try {
    await Department.deleteOne({ id: req.params.departmentId });
    res.json({ message: "department deleted successfully", success: true });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
});

//Delete all departments
router.delete("/", async (req, res) => {
  try {
    await Department.deleteMany({});
    res.json({
      message: "All departments deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
});

module.exports = router;
