const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  tag: {
    type: String,
    default: 'General'
  },
  date: {
    default: Date.now,
    type: Date
  }
});

module.exports = mongoose.model('Note', NoteSchema);