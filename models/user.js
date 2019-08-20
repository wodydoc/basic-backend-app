const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  // MODIFIES THE USER MODEL SO THAT IT STORES TRACKS TO SPECIFIC
  tracks: [{ type: ObjectId, ref: 'Track' }],
  decks: [{ type: ObjectId, ref: 'Deck' }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
