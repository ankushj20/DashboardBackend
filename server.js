require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const connectDB = require("./db");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const newsRoutes = require("./routes/newsRoutes");
const adRoutes = require("./routes/adRoute"); 

const app = express();

app.use(cors({
  origin: ["http://localhost:5173"], 
  credentials: true
}));

// app.use(cors({ credentials: true, origin: true }));


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); 

app.use(
  session({
    secret: process.env.SESSION_SECRET || "pratikdixit",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", 
      httpOnly: true,
      sameSite: "lax"
    }
  })
);

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/ads", adRoutes);

app.get("/", (req, res) => {
  res.send("API is Running...");
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
