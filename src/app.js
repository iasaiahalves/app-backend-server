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

// Configure CORS with specific options
const corsOptions = {
  origin: 'https://app-backend-server-kep3z8sip-iasaiah-alves-projects.vercel.app', // Only allow requests from this origin
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
