const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const env = require("./env");

aws.config.update({
  accessKeyId: env.AWS_ACCESSKEYID,
  secretAccessKey: env.AWS_SECRETACCESSKEY,
  region: env.AWS_REGION
});
const s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "viewablebucket",
    acl: "public-read",
    key: function(req, file, cb) {
      cb(null, Date.now() + "." + file.originalname.split(".").pop());
    }
  })
});

module.exports = upload;