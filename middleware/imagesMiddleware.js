const multer = require("multer");
const cloudinary = require('cloudinary').v2
const fs = require("fs");

const upload = multer({ dest: "./images" });

const picUrl = (req, res, next) => {
  try {
    const picUrl = "http://localhost:8000/" + req.file.path;
    console.log(picUrl);
    req.body.picUrl = picUrl;
    next();
  } catch (err) {
    res.status(500).send(err);
  }
};

cloudinary.config({
  cloud_name: "drot9hlg1",
  api_key: "861779668718765",
  api_secret: "O6VWcKcrPTFnRca7Bz0kiba5xgo",
})


function uploadToCloudinary(req, res, next) {
  if (!req.file) {
    res.status(400).send("No image attached");
    return;
  }

  cloudinary.uploader.upload(req.file.path, (err, result) => {
   if(err) {
    res.status(500).send(err.message);
    return
   }
   if(result) {
    req.body.picUrl = result.secure_url
    fs.unlinkSync(req.file.path)
    next()
   }
  });
}

module.exports = { upload, picUrl, uploadToCloudinary};
