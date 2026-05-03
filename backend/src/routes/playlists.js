const express = require('express');
const router = express.Router();
const Playlist = require('../models/Playlist');
const auth = require('../middleware/auth');

// Get user's playlists
router.get('/', auth, async (req, res) => {
  try {
    const playlists = await Playlist.find({ owner: req.user.id })
      .populate('songs')
      .sort({ createdAt: -1 });
    res.json(playlists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get playlist by ID
router.get('/:id', async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate('songs');
    if (!playlist) {
      return res.status(404).json({ msg: 'Playlist not found' });
    }
    res.json(playlist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create playlist
router.post('/', auth, async (req, res) => {
  try {
    const { name, description } = req.body;

    let playlist = new Playlist({
      name,
      description,
      owner: req.user.id
    });

    playlist = await playlist.save();
    res.json(playlist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add song to playlist
router.put('/:id/add-song', auth, async (req, res) => {
  try {
    const { songId } = req.body;
    const playlist = await Playlist.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { songs: songId } },
      { new: true }
    ).populate('songs');
    res.json(playlist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Remove song from playlist
router.put('/:id/remove-song', auth, async (req, res) => {
  try {
    const { songId } = req.body;
    const playlist = await Playlist.findByIdAndUpdate(
      req.params.id,
      { $pull: { songs: songId } },
      { new: true }
    ).populate('songs');
    res.json(playlist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
