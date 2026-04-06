const jwt = require('jsonwebtoken');
const Match = require('../models/Match');
const Message = require('../models/Message');
const User = require('../models/User');

const registerSocketHandlers = (io) => {
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;

      if (!token) {
        return next(new Error('Unauthorized'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select('_id name images');

      if (!user) {
        return next(new Error('Unauthorized'));
      }

      socket.user = user;
      return next();
    } catch (error) {
      return next(new Error('Unauthorized'));
    }
  });

  io.on('connection', (socket) => {
    socket.on('setup', (userData) => {
      const roomId = userData?._id || String(socket.user._id);
      socket.join(roomId);
    });

    socket.on('join chat', async (matchId) => {
      const match = await Match.findById(matchId).select('participants');
      if (!match) {
        return;
      }

      const isParticipant = match.participants.some(
        (participantId) => String(participantId) === String(socket.user._id)
      );

      if (!isParticipant) {
        return;
      }

      socket.join(String(matchId));
    });

    socket.on('new message', async (payload) => {
      const { matchId, content } = payload || {};

      if (!matchId || !content || !String(content).trim()) {
        return;
      }

      const match = await Match.findById(matchId).select('participants');
      if (!match) {
        return;
      }

      const senderId = String(socket.user._id);
      const isParticipant = match.participants.some(
        (participantId) => String(participantId) === senderId
      );

      if (!isParticipant) {
        return;
      }

      const receiverId = match.participants
        .map((participantId) => String(participantId))
        .find((participantId) => participantId !== senderId);

      if (!receiverId) {
        return;
      }

      const message = await Message.create({
        sender: senderId,
        receiver: receiverId,
        matchId,
        content: String(content).trim(),
      });

      await Match.findByIdAndUpdate(matchId, {
        lastMessage: message.content,
        lastMessageAt: message.createdAt,
      });

      io.to(String(matchId)).emit('message received', message);
    });
  });
};

module.exports = {
  registerSocketHandlers,
};