const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    targetUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    action: {
      type: String,
      enum: ['like', 'pass'],
      required: true,
    },
  },
  { timestamps: true }
);

interactionSchema.index({ user: 1, targetUser: 1 }, { unique: true });
interactionSchema.index({ targetUser: 1, action: 1 });

module.exports = mongoose.model('Interaction', interactionSchema);