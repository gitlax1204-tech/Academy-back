const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: [true, 'Please add a course name'],
    },
    courseImage: {
      type: String,
      required: [true, 'Please add a course image URL'],
    },
    courseFee: {
      type: Number,
      required: [true, 'Please add a course fee'],
    },
    courseCategory: {
      type: String,
    }, 
    trainer: {
      type: String,
    },
    duration: {
      type: String,
      required: [true, 'Please add a duration'],
    },
    admissionOpen: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: 'aca', // map to existing collection
    strict: false, // allow flexible objects
    timestamps: true,
  }
);

module.exports = mongoose.model('Course', courseSchema);
