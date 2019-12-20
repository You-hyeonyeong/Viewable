import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import { env } from "./env";
//require('dotenv').config({path: __dirname + '\\' + '.env'});

aws.config.update({
    accessKeyId: env.AWS_ACCESSKEYID,
    secretAccessKey: env.AWS_SECRETACCESSKEY,
    region : env.AWS_REGION
});
const s3 = new aws.S3();
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'viewablebucket',
        acl: 'public-read',
        key: function(req, file, cb) {
            cb(null, Date.now() + '.' + file.originalname.split('.').pop());
        }
    })
});


module.exports = upload;