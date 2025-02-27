const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require('./routes/userRoutes.js');
const uploadRoutes = require('./routes/uploadRoutes.js');
const path = require("path");


dotenv.config();

const app = express();

//  Apply Middleware First
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "https://app-backend-server-fivnp53pp-iasaiah-alves-projects.vercel.app", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

//  Serve static files
app.use(express.static(path.join(__dirname, "../public")));

//  Routes (after middleware)
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

module.exports = app;
