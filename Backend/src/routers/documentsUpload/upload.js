const router = require("express").Router();
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const DocumentVerificationApplication = require("../../models/DocumentVerificationApplication");
const Application = require("../../models/ApplicationModel");

router.post("/action", async (req, res) => {
  try {
    let documentVerificationApplication =
      await DocumentVerificationApplication.findById(req.body.applicationId);

    documentVerificationApplication.status = "approved";

    await documentVerificationApplication.save();

    let normalApplication = new Application({
      applicant: documentVerificationApplication.applicant,
      scheme: documentVerificationApplication.scheme,
    });

    await normalApplication.save();
    res.json({ success: true, message: "Application edited successfully" });
  } catch (error) {
    res.json({ message: error.message, success: true });
  }
});

router.post("/upload", async (req, res, next) => {
  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      //next(err);
      console.log("error");
      return;
    }
    //console.log(files);

    fs.writeFileSync(
      path.join(__dirname) + `/${fields.applicantId}.pdf`,
      fs.readFileSync(files.marksheet.filepath),
      (err) => {
        if (err) {
          console.error(err);
        }
        // file written successfully
      }
    );

    let application = new DocumentVerificationApplication({
      applicant: fields.applicantId,
      scheme: fields.schemeId,
    });

    await application.save();
    res.json({ message: "Document uploaded successfully", status: true });
    // res.sendFile("abc.pdf", {
    //   root: path.join(__dirname),
    // });
    // res.json({ fields, files });
  });
});

router.get("/view", async (req, res) => {
  try {
    res.sendFile(`6308829446f6a741e8327de2.pdf`, { root: __dirname });
    //res.json({ path: path.join(__dirname) + "/" + req.query.userId + ".pdf" });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
});

module.exports = router;
