const express = require('express');
const router = express.Router();
const {
  uploadCourse,
  getCourses,
  getCourseById,
  deleteCourse,
  editCourse,
} = require('../controllers/courseController');

router.post('/upload', uploadCourse);
router.get('/getdata', getCourses);
router.get('/getid/:id', getCourseById);
router.delete('/del/:id', deleteCourse);
router.patch('/edit/:id', editCourse);

module.exports = router;
