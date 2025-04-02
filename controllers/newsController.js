// Controller to handle the news upload
const News = require('../models/newsModel');
const upload = require("../config/multer");


// const uploadNews = async (req, res) => {
//   try {
//       console.log("Body:", req.body); 
//       console.log("Files:", req.files); 
      
//       if (!req.body.title || !req.body.details || req.files.length === 0) {
//           return res.status(400).json({ error: "All fields are required" });
//       }

//       const images = req.files.map((file) => file.path);
      
//       const news = new News({
//           title: req.body.title,
//           details: req.body.details,
//           category: req.body.category,
//           images, 
//       });

//       await news.save();
//       return res.status(200).json({ message: "News created successfully!" });
//   } catch (err) {
//       console.error("Error:", err); 
//       return res.status(500).json({ error: "Failed to submit news" });
//   }
// };


const uploadNews = async (req, res) => {
  try {
    const { title, details, category } = req.body;

    // Cloudinary URLs ko extract karo
    const imageUrls = req.files.map(file => file.path); // ✅ Cloudinary URL

    const newPost = new News({
      title,
      details,
      category,
      images: imageUrls, // ✅ MongoDB में Cloudinary URLs Save करो
    });

    await newPost.save();
    res.status(201).json({ message: "News uploaded successfully!", data: newPost });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload news!" });
  }
};


// Get all posts
const getPosts = async (req, res) => {
  try {
    const posts = await News.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await News.findByIdAndDelete(id);
    res.status(200).send("Post deleted successfully");
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post" });
  }
};

// Update a post
// const updatePost = async (req, res) => {
//   console.log("Update Request Received for ID:", req.params.id);
//   console.log("Request Body:", req.body);
  
//   try {
//       const post = await News.findById(req.params.id);
//       if (!post) {
//           return res.status(404).json({ error: "Post not found" });
//       }

//       post.title = req.body.title || post.title;
//       post.details = req.body.details || post.details;
//       post.category = req.body.category || post.category;
      
//       await post.save();
//       res.json({ message: "Post updated successfully!" });
//   } catch (err) {
//       console.error("Update Error:", err);
//       res.status(500).json({ error: "Failed to update post" });
//   }
// };

const updatePost = async (req, res) => {
  try {
    // console.log("Received Body:", req.body);
    // console.log("Received Files:", req.files);

    const { title, category, details } = req.body;
    let images = req.body.existingImages || []; // ✅ Purani images ko preserve karo

    // ✅ Agar naye images aaye hain to unko bhi add karo
    if (req.files) {
      const newImages = req.files.map((file) => file.path);
      images = [...images, ...newImages]; // ✅ Combine old & new images
    }

    // ✅ Database me update karo
    const updatedPost = await News.findByIdAndUpdate(
      req.params.id,
      { title, category, details, images },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post updated successfully", updatedPost });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 🟢 Single Post Fetch Karne Ka Controller
const getSinglePost = async (req, res) => {
  try {
    // console.log("Fetching Post with ID:", req.params.id);

    const post = await News.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    // console.error("Error fetching post:", error);
    res.status(500).json({ error: "Failed to fetch post" });
  }
};

module.exports = { getPosts, deletePost, updatePost, uploadNews, getSinglePost };

