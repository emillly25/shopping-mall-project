// upload.js
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: 'AKIAVQWHLMXUA2ZTWT3P',
  secretAccessKey: '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',
  region: 'ap-northeast-2',
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'eliceteam7-s3-bucket',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      cb(null, `archive/${Date.now()}_${file.originalname}}`);
    },
  }),
});

module.exports = upload;
