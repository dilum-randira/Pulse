const mongoose = require('mongoose');
const Interaction = require('../models/Interaction');
const User = require('../models/User');

const getFeed = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id).select('-password');

    if (!currentUser) {
      return res.status(404).json({ message: 'Current user not found.' });
    }

    const coordinates = currentUser.location?.coordinates;
    const hasCoordinates =
      Array.isArray(coordinates) && coordinates.length === 2 && coordinates.every(Number.isFinite);

    if (!hasCoordinates) {
      return res.status(400).json({ message: 'Current user location is required for discovery.' });
    }

    const interactions = await Interaction.find({ user: currentUser._id }).select('targetUser');
    const swipedUserIds = interactions.map((item) => item.targetUser);

    const feedFilter = {
      _id: {
        $ne: new mongoose.Types.ObjectId(currentUser._id),
        $nin: swipedUserIds,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates,
          },
        },
      },
    };

    if (currentUser.interestedIn && currentUser.interestedIn !== 'everyone') {
      feedFilter.gender = currentUser.interestedIn;
    }

    const users = await User.find(feedFilter)
      .select('name bio gender interestedIn images location')
      .limit(25);

    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const swipe = async (req, res) => {
  try {
    const { targetUserId, action } = req.body;

    if (!targetUserId || !action) {
      return res.status(400).json({ message: 'targetUserId and action are required.' });
    }

    if (!['like', 'pass'].includes(action)) {
      return res.status(400).json({ message: 'Invalid action.' });
    }

    if (String(targetUserId) === String(req.user._id)) {
      return res.status(400).json({ message: 'You cannot swipe on yourself.' });
    }

    const targetUserExists = await User.exists({ _id: targetUserId });
    if (!targetUserExists) {
      return res.status(404).json({ message: 'Target user not found.' });
    }

    await Interaction.findOneAndUpdate(
      {
        user: req.user._id,
        targetUser: targetUserId,
      },
      {
        action,
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );

    let isMatch = false;
    if (action === 'like') {
      const reciprocalLike = await Interaction.findOne({
        user: targetUserId,
        targetUser: req.user._id,
        action: 'like',
      });

      isMatch = Boolean(reciprocalLike);
    }

    return res.json({ success: true, match: isMatch });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFeed,
  swipe,
};