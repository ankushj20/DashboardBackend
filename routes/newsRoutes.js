const express = require("express");
const { uploadNews, getPosts, deletePost, updatePost } = require("../controllers/newsController");
const upload = require("../config/multer"); // ✅ Updated Multer Import

const router = express.Router();

router.post("/upload", upload.array("images", 5), uploadNews); // ✅ Images अब Cloudinary पर जाएंगी

router.get("/posts", getPosts);
router.delete("/posts/:id", deletePost);
router.put("/posts/:id", updatePost);

module.exports = router;
