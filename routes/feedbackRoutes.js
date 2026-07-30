const express = require('express');
const router = express.Router();
const { submitFeedback, getAllFeedback, updateFeedback, deleteFeedback } = require('../controllers/feedbackController');

router.post('/', submitFeedback);
router.get('/', getAllFeedback);
router.patch('/:id', updateFeedback);
router.delete('/:id', deleteFeedback);

module.exports = router;
