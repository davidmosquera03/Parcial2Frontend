const mongoose = require('mongoose');

const collection = 'tweets';

const objectSchema = {
  content: { type: String, required: true },
  likes: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }], default: [] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  // Campo opcional para respuestas
  replyTo: { type: mongoose.Schema.Types.ObjectId, ref: 'tweets', default: null },
  comments: [
    {
      comment: { type: String },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    },
  ],
};

const options = {
  timestamps: true,
};

const schema = new mongoose.Schema(objectSchema, options);

const Tweet = mongoose.model(collection, schema);

module.exports = Tweet;
