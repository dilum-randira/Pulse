const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');
const { uploadProfileImage } = require('../controllers/uploadController');

const router = express.Router();

router.post('/', protect, upload.single('image'), uploadProfileImage);

module.exports = router;
