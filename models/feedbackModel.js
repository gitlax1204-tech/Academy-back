const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
    },
    rating: {
      type: Number,
      required: [true, 'Please add a rating between 1 and 5'],
      min: 1,
      max: 5,
    }, 
    message: {
      type: String,
      required: [true, 'Please add a message'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Feedback', feedbackSchema);
