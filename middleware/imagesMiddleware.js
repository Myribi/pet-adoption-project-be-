const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const { petModel } = require("../models/petsModel");

const upload = multer({ dest: "./images" });

cloudinary.config({
  cloud_name: "drot9hlg1",
  api_key: "861779668718765",
  api_secret: "O6VWcKcrPTFnRca7Bz0kiba5xgo",
});

function uploadToCloudinary(req, res, next) {
  if (!req.file) {
    res.status(400).send("No image attached");
    return;
  }

  cloudinary.uploader.upload(req.file.path, (err, result) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    if (result) {
      req.body.picture = result.secure_url;
      console.log(req.body.picUrl)
      fs.unlinkSync(req.file.path);
      next();
    }
  });
}

function updatePhotoToCloudinary(req, res, next) {
 
  if (req.file) {
  cloudinary.uploader.upload(req.file.path, (err, result) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    if (result) {
      req.body.picture = result.secure_url;
      console.log(req.body.picUrl)
      fs.unlinkSync(req.file.path);
      next();
    }
  
  });
} else {
  next()
}

}

module.exports = { upload, uploadToCloudinary,updatePhotoToCloudinary};
