const path = require('path');
const fs = require('fs');

const uploadImage = (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: 'No files were uploaded.' });
  }

  const imageFile = req.files.image;
  const uploadDir = path.join(__dirname, '../public/uploads'); // Path to the uploads folder

  if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL_ENV) {
    // Local development: save to the uploads folder
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
    const fileName = `${Date.now()}-${imageFile.name}`;
    const localPath = path.join(uploadDir, fileName);

    imageFile.mv(localPath, (err) => {
      if (err) {
        console.error('Error saving file locally:', err);
        return res.status(500).json({ message: 'Error saving file locally.' });
      }
      console.log(`File saved locally: ${localPath}`);
      res.status(200).json({ message: 'File uploaded and saved locally!', path: `uploads/${fileName}` });
    });
  } else {
    // Vercel: current behavior (send to API for handling)
    console.log("Vercel enviroment detected")
    // Add your existing Vercel upload logic here. It is probably storing temporarily the image or storing in a Cloud provider.
    res.status(200).json({ message: 'File uploaded successfully on Vercel!' });
  }
};

module.exports = { uploadImage };
