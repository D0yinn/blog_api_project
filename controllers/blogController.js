const Blog = require('../models/Blog');
const calculateReadingTime = require('../utils/readingTime');

exports.createBlog = async (req, res) => {
  try {
    const { title, description, tags, body } = req.body;
    const reading_time = calculateReadingTime(body);

    const blog = await Blog.create({
      title,
      description,
      tags,
      author: req.user._id,
      body,
      reading_time,
    });

    res.status(201).json({
      status: 'success',
      data: { blog },
    });
  } catch (error) {
    console.error('Create Blog Error:', error);
    res.status(500).json({ error: 'Failed to create blog', details: error.message });
  }
};


exports.getAllPublishedBlogs = async (req, res) => {
  try {
    const { title, tags, author, order_by, page = 1, limit = 20 } = req.query;
    const filter = { state: 'published' };

    if (title) filter.title = new RegExp(title, 'i');
    if (tags) filter.tags = { $in: tags.split(',') };
    if (author) {
      if (/^[0-9a-fA-F]{24}$/.test(author)) {
        filter.author = author;
      } else {
        return res.status(400).json({ error: 'Invalid author ID' });
      }
    }

    const sortOptions = {};
    if (order_by) {
      const fields = ['reading_time', 'read_count', 'timestamp'];
      if (fields.includes(order_by)) sortOptions[order_by] = -1;
    }

    const blogs = await Blog.find(filter)
      .populate('author', 'first_name last_name email')
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ status: 'success', data: blogs });
  } catch (err) {
    console.error('GetAllPublishedBlogs Error:', err);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
};



exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'first_name last_name email');

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    const isAuthor = req.user && blog.author._id.toString() === req.user._id.toString();

    if (blog.state === 'draft' && !isAuthor) {
      return res.status(403).json({ error: 'Access denied: Not your draft' });
    }

    blog.read_count += 1;
    await blog.save();

    res.json({ status: 'success', data: blog });
  } catch (err) {
    console.error('GetBlogById Error:', err);
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
};


exports.getUserBlogs = async (req, res) => {
  try {
    const { state, page = 1, limit = 10, order = 'desc' } = req.query;
    const filter = { author: req.user._id };

    if (state) filter.state = state;

    const blogs = await Blog.find(filter)
      .sort({ createdAt: order === 'asc' ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Blog.countDocuments(filter);

    res.json({
      status: 'success',
      total,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      data: blogs,
    });
  } catch (err) {
    console.error('GetUserBlogs Error:', err);
    res.status(500).json({ error: 'Failed to fetch user blogs' });
  }
};


exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    if (!blog.author.equals(req.user._id)) {
      return res.status(403).json({ error: 'You are not authorized to update this blog' });
    }

    const allowedFields = ['title', 'description', 'tags', 'body', 'state'];
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        blog[field] = req.body[field];
      }
    });

    if (req.body.body) {
      blog.reading_time = calculateReadingTime(req.body.body);
    }

    await blog.save();
    res.json({ status: 'success', data: blog });
  } catch (err) {
    console.error('UpdateBlog Error:', err);
    res.status(500).json({ error: 'Failed to update blog' });
  }
};


exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    if (!blog.author.equals(req.user._id)) {
      return res.status(403).json({ error: 'You are not authorized to delete this blog' });
    }

    await blog.deleteOne();
    res.json({ status: 'success', message: 'Blog deleted successfully' });
  } catch (err) {
    console.error('DeleteBlog Error:', err);
    res.status(500).json({ error: 'Failed to delete blog' });
  }
};


exports.publishBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    if (!blog.author.equals(req.user._id)) {
      return res.status(403).json({ error: 'Not authorized to publish this blog' });
    }

    if (blog.state === 'published') {
      return res.status(400).json({ error: 'Blog is already published' });
    }

    blog.state = 'published';
    blog.published_at = new Date();
    await blog.save();

    res.status(200).json({ message: 'Blog published successfully', blog });
  } catch (err) {
    console.error('PublishBlog Error:', err);
    res.status(500).json({ error: 'Failed to publish blog' });
  }
};
