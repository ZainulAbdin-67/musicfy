const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  album: {
    type: String,
    default: 'Unknown Album'
  },
  genre: {
    type: String,
    default: 'General'
  },
  duration: {
    type: Number,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
    default: null
  },
  playCount: {
    type: Number,
    default: 0
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Song', SongSchema);
