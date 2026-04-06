const express = require('express');
const { getMessagesForMatch } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:matchId', protect, getMessagesForMatch);

module.exports = router;