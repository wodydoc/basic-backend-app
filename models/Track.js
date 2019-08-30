'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  artist: {
    type: String,
    required: true
  },
  lyrics: {
    type: String,
    required: true
  },
  category: {
    type: Array,
    enum: ['adverbs', 'slang', 'greetings', 'subjunctive', 'cute']
  }
});

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;
