const express = require("express");
const { uploadAd, getAds, deleteAd } = require("../controllers/adController");

const router = express.Router();

router.post("/upload-ad", uploadAd); // ✅ Cloudinary Upload Middleware Used
router.get("/ads", getAds);
router.delete("/ad/:id", deleteAd);

module.exports = router;
