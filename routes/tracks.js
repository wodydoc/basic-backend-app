'use strict';

const express = require('express');
const Track = require('../models/Track.js');
const User = require('../models/User.js');

const router = express.Router();

router.get('/', async (req, res, next) => {
  // GETTING ALL THE DECKS FROM DB - USED IN SEARCH
  try {
    const listOfTracks = await Track.find({});
    res.status(200).json(listOfTracks);
  } catch (error) {
    next(error);
  }
});

router.get('/my', async (req, res, next) => {
  // GETTING ONLY MY SONGS - THE SONGS I HAVE SAVED
  try {
    const { _id } = req.session.currentUser;
    const myUserInfo = await User.findById(_id).populate('tracks');
    res.status(200).json(myUserInfo);
  } catch (error) {
    next(error);
  }
});

router.post('/create', async (req, res, next) => {
  // Create a track
  try {
    const { _id } = req.session.currentUser;
    const newTrack = req.body;
    const createdTrack = await Track.create(newTrack);
    const updatedUser = await User.findByIdAndUpdate(_id, { $push: { tracks: createdTrack._id } }, { new: true }).populate('tracks');
    res.status(200).json({ createdTrack, updatedUser });
  } catch (error) {
    next(error);
  }
});

router.put('/:id/save', async (req, res, next) => {
// Save one track - favorite button
  const { _id } = req.session.currentUser;
  const { id } = req.params;
  const updatedUser = await User.findByIdAndUpdate(_id, { $push: { tracks: id } }, { new: true }).populate('tracks');
  res.status(200).json({ updatedUser });
});

router.delete('/:id/unsave', async (req, res, next) => {
  // Unsave one Track
  const { _id } = req.session.currentUser;
  const { id } = req.params;
  const updatedUser = await User.findByIdAndUpdate(_id, { $pull: { tracks: id } }, { new: true }).populate('tracks');
  res.status(200).json({ updatedUser });
});

module.exports = router;
