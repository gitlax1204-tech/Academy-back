const Feedback = require('../models/feedbackModel');

// @desc    Submit feedback
// @route   POST /feedback
// @access  Public
const submitFeedback = async (req, res) => {
  try {
    const { name, email, rating, message } = req.body;

    if (!name || !email || !rating || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const feedback = await Feedback.create({
      name,
      email,
      rating,
      message,
    });

    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting feedback', error: error.message });
  }
};

// @desc    Get all feedback
// @route   GET /feedback
// @access  Public
const getAllFeedback = async (req, res) => {
  try {
    const feedbackList = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbackList);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedback', error: error.message });
  }
};

// @desc    Update feedback by ID
// @route   PATCH /feedback/:id
// @access  Public
const updateFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, message } = req.body;

    const feedback = await Feedback.findById(id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    if (rating !== undefined) feedback.rating = rating;
    if (message !== undefined) feedback.message = message;

    const updatedFeedback = await feedback.save();
    res.status(200).json(updatedFeedback);
  } catch (error) {
    res.status(500).json({ message: 'Error updating feedback', error: error.message });
  }
};

// @desc    Delete feedback by ID
// @route   DELETE /feedback/:id
// @access  Public
const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    const feedback = await Feedback.findByIdAndDelete(id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.status(200).json({ message: 'Feedback deleted successfully', id });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting feedback', error: error.message });
  }
};

module.exports = {
  submitFeedback,
  getAllFeedback,
  updateFeedback,
  deleteFeedback,
};
