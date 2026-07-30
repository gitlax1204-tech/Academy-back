const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB using Mongoose
connectDB();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

// Mount routes (User and Course routes are mounted at root level to maintain API contract with React frontend)
app.use('/', userRoutes);
app.use('/', courseRoutes);
app.use('/feedback', feedbackRoutes);

// Error Handling Middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

module.exports = app;
