const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { authenticate } = require('../middleware/authMiddleware');

// Create blog
router.post('/', authenticate, blogController.createBlog);

// Get all published blogs (with filters, pagination, search)
router.get('/', blogController.getAllPublishedBlogs);

// Get all blogs by the logged-in user
router.get('/user/blogs', authenticate, blogController.getUserBlogs);

// Get a single blog by ID (published or own draft)
router.get('/:id', authenticate, blogController.getBlogById);

// Update a blog
router.put('/:id', authenticate, blogController.updateBlog);

// Delete a blog
router.delete('/:id', authenticate, blogController.deleteBlog);

// Publish a blog
router.patch('/:id/publish', authenticate, blogController.publishBlog);

module.exports = router;
