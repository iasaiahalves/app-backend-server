const multer = require("multer");
const path = require("path");

//Set storage engine

const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage }).single("image");

// Controller function to handle upload
exports.uploadImage = (req, res) => {
  upload(req, res, (err) => {
      if (err) {
          console.error("Upload Error:", err);
          return res.status(500).json({ message: "File upload failed", error: err.message });
      }

      if (!req.file) {
          console.warn("No file uploaded!");
          return res.status(400).json({ message: "No file uploaded" });
      }

      // File received successfully in memory
      res.json({
          message: "File uploaded successfully",
          filename: req.file.originalname,
          mimetype: req.file.mimetype,
          size: req.file.size
      });
  });
};

