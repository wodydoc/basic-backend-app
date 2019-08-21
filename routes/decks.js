'use strict';

const express = require('express');
const Deck = require('../models/Deck.js');
const User = require('../models/User.js');

const router = express.Router();

router.get('/', async (req, res, next) => {
  // GETTING ALL THE TRACKS FROM DB - USED IN SEARCH
  try {
    const listOfDecks = await Deck.find({});
    res.status(200).json(listOfDecks);
  } catch (error) {
    next(error);
  }
});

router.get('/my', async (req, res, next) => {
  // GETTING ONLY MY SONGS - THE SONGS I HAVE SAVED
  try {
    const { _id } = req.session.currentUser;
    const myUserInfo = await User.findById(_id).populate('decks');
    res.status(200).json(myUserInfo);
  } catch (error) {
    next(error);
  }
});

router.post('/create', async (req, res, next) => {
  // Create a track
  try {
    const { _id } = req.session.currentUser;
    const newDeck = req.body;
    const createdDeck = await Deck.create(newDeck);
    const updatedUser = await User.findByIdAndUpdate(_id, { $push: { decks: createdDeck._id } }, { new: true }).populate('decks');
    res.status(200).json({ createdDeck, updatedUser });
  } catch (error) {
    next(error);
  }
});

router.put('/:id/save', (req, res, next) => {
// Save one track

});

router.delete('/:id/unsave', (req, res, next) => {
  // Unsave one Track
});

module.exports = router;
