
// config/multer.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");
const cloudinary = require("../config/cloudinary")

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "catering", // Customize the folder where images will be stored
  allowedFormats: ["jpg", "png"],
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const multerUpload = multer({ storage: storage });

module.exports = multerUpload;
