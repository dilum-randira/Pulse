const express = require('express');
const { getFeed, getMatches, swipe } = require('../controllers/matchController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getMatches);
router.get('/feed', protect, getFeed);
router.post('/swipe', protect, swipe);

module.exports = router;