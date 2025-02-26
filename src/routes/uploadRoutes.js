const express = require('express');
const { uploadImage } = require('../controllers/uploadController.js');

const router = express.Router();

router.post('/', uploadImage);

module.exports = router;