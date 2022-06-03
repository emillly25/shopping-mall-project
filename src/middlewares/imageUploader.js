// upload.js
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: 'AKIAVQWHLMXUNP2BDQSR',
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
