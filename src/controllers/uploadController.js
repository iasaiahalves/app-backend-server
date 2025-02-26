const multer = require("multer");
const path = require("path");

//Set storage engine

const storage = multer.diskStorage({
  destination: "./uploads", // it save files in the "Uploads" folder
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));// Rename file
  },
});

//Initialize multer with storage settings
const upload = multer({ storage }).single("image"); //Accepts one file under the key "image"


// Controller function to handle upload
exports.uploadImage = (req, res) => {
  upload(req, res, (err) => {
    console.log("Received File:", req.file); // Log received file
    
    if (err) {
      console.error("Upload Error:", err);
      return res.status(500).json({ message: "File upload failed", error: err.message });
    }

    if (!req.file) {
      console.warn("No file uploaded!");
      return res.status(400).json({ message: "No file uploaded" });
    }

    res.json({
      message: "File uploaded successfully",
      file: req.file, // Return file details
    });
  });
};

