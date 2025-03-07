const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinaryConfig"); // Cloudinary Config Import

// Dynamic Cloudinary Storage Setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folderName = "general"; // Default folder

    if (req.body.uploadType === "news") {
      folderName = "news_images"; // News Images Folder
    } else if (req.body.uploadType === "adImage") {
      folderName = "advertisements"; // Ads Folder
    }

    return {
      folder: folderName,
      format: "png", // Image format
      public_id: Date.now() + "-" + file.originalname,
    };
  },
});

// Multer Upload Middleware
const upload = multer({ storage });

module.exports = upload;
