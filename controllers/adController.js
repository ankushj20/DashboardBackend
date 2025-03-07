const Advertisement = require("../models/adModel");
const upload = require("../config/multer"); // ✅ Import Cloudinary Multer Middleware

// ===================== Upload Advertisement (Cloudinary) ===================== //
const uploadAd = async (req, res) => {
  upload.single("adImage")(req, res, async (err) => {
    if (err) return res.status(500).json({ error: "Upload failed", details: err });

    if (!req.file || !req.file.path) return res.status(400).json({ error: "No file uploaded" });

    const imageUrl = req.file.path; // ✅ Cloudinary URL

    try {
      const newAd = new Advertisement({ imageUrl });
      await newAd.save();
      res.json({ success: true, message: "Ad Uploaded Successfully!", imageUrl });
    } catch (error) {
      res.status(500).json({ error: "Failed to save advertisement" });
    }
  });
};

// ===================== Get All Ads ===================== //
const getAds = async (req, res) => {
  try {
    const ads = await Advertisement.find().sort({ createdAt: -1 });
    res.status(200).json(ads);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch ads" });
  }
};

// ===================== Delete an Ad ===================== //
const deleteAd = async (req, res) => {
  try {
    const { id } = req.params;
    const ad = await Advertisement.findById(id);
    if (!ad) {
      return res.status(404).json({ error: "Ad not found" });
    }

    await Advertisement.findByIdAndDelete(id);
    res.status(200).json({ message: "Advertisement deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete advertisement" });
  }
};

module.exports = { uploadAd, getAds, deleteAd };
