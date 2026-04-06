const express = require('express');
const { getFeed, swipe } = require('../controllers/matchController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/feed', protect, getFeed);
router.post('/swipe', protect, swipe);

module.exports = router;