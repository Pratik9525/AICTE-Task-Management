// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
var fs = require("fs");
// Set the region
//AWS.config.update({ region: "REGION" });

// Create S3 service object
var s3 = new AWS.S3({ apiVersion: "2006-03-01" });

function uploadFile() {
  // call S3 to retrieve upload file to specified bucket
  var uploadParams = { Bucket: process.argv[2], Key: "", Body: "" };
  var file = process.argv[3];

  // Configure the file stream and obtain the upload parameters
  var fileStream = fs.createReadStream(file);

  fileStream.on("error", function (err) {
    console.log("File Error", err);
  });
  uploadParams.Body = fileStream;
  var path = require("path");
  uploadParams.Key = path.basename(file);

  // call S3 to retrieve upload file to specified bucket
  s3.upload(uploadParams, function (err, data) {
    if (err) {
      throw error;
    }
    if (data) {
      console.log("Upload Success", data.Location);
    }
  });
}

module.exports = uploadFile;
