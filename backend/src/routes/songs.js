const express = require('express');
const router = express.Router();
const Song = require('../models/Song');
const auth = require('../middleware/auth');

// Get all songs with search and filter
router.get('/', async (req, res) => {
  try {
    const { search, genre, limit = 20, skip = 0 } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { artist: new RegExp(search, 'i') },
        { album: new RegExp(search, 'i') }
      ];
    }

    if (genre) {
      query.genre = genre;
    }

    const songs = await Song.find(query)
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort({ createdAt: -1 });

    const total = await Song.countDocuments(query);

    res.json({
      songs,
      total,
      hasMore: parseInt(skip) + parseInt(limit) < total
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get song by ID
router.get('/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ msg: 'Song not found' });
    }
    res.json(song);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create song (authenticated)
router.post('/', auth, async (req, res) => {
  try {
    const { title, artist, album, genre, duration, url } = req.body;

    let song = new Song({
      title,
      artist,
      album,
      genre,
      duration,
      url,
      uploadedBy: req.user.id
    });

    song = await song.save();
    res.json(song);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Increment play count
router.put('/:id/play', async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(
      req.params.id,
      { $inc: { playCount: 1 } },
      { new: true }
    );
    res.json(song);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
