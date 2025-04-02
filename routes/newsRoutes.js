const express = require("express");
const { uploadNews, getPosts, deletePost, updatePost, getSinglePost } = require("../controllers/newsController");
const upload = require("../config/multer");

const router = express.Router();

router.post("/upload", upload.array("images", 5), uploadNews); 

router.get("/posts", getPosts);
router.delete("/posts/:id", deletePost);
router.put("/posts/:id", updatePost);
router.get("/posts/:id", getSinglePost);

module.exports = router;
