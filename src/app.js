const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require('./routes/userRoutes.js');
const uploadRoutes = require('./routes/uploadRoutes.js');
const path = require("path");
const fileUpload = require('express-fileupload');


dotenv.config();

const app = express();

//  Apply Middleware First
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// Configure CORS with specific options
const corsOptions = {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

app.use(cors(corsOptions)); // Use the configured CORS options


// Serve static files
app.use(express.static(path.join(__dirname, "../public")));


//  Routes (after middleware)
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

module.exports = app;
