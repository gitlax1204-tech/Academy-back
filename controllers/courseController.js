const Course = require('../models/courseModel');

// @desc    Upload new course
// @route   POST /upload
// @access  Public
const uploadCourse = async (req, res) => {
  try {
    const data = req.body;
    console.log("Uploading course data:", data);
    
    // Using Mongoose create
    const result = await Course.create(data);
    
    // To match original MongoDB driver structure (optional, but let's send standard or complete response)
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error uploading course", error: error.message });
  }
};

// @desc    Get all courses
// @route   GET /getdata
// @access  Public
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error: error.message });
  }
};

// @desc    Get course by ID
// @route   GET /getid/:id
// @access  Public
const getCourseById = async (req, res) => {
  try {
    const id = req.params.id;
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Error fetching course by ID", error: error.message });
  }
};

// @desc    Delete course by ID
// @route   DELETE /del/:id
// @access  Public
const deleteCourse = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Deleting course with ID:", id);
    const result = await Course.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error deleting course", error: error.message });
  }
};

// @desc    Edit/Patch course by ID
// @route   PATCH /edit/:id
// @access  Public
const editCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    
    // update with validation bypassed for flexible fields since it uses strict: false
    const result = await Course.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true, upsert: true }
    );
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error updating course", error: error.message });
  }
};

module.exports = {
  uploadCourse,
  getCourses,
  getCourseById,
  deleteCourse,
  editCourse,
};
