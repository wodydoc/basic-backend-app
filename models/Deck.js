'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deckSchema = new Schema({
  word: {
    type: String,
    required: true,
    unique: true
  },
  translation: {
    type: String,
    required: true
  }
});

const Deck = mongoose.model('Deck', deckSchema);

module.exports = Deck;
