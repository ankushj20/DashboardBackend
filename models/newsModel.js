const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  details: { type: String, required: true },
  images: [String], // Array to store image paths
  category: { type: String, required: true},
  
}, { timestamps: true });

const News = mongoose.model("News", newsSchema);

module.exports = News;
