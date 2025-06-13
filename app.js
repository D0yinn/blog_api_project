const express = require('express');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

const app = express();


// Built‑in JSON parser
app.use(express.json());

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);


// Default route
app.get('/', (req, res) => {
  res.send('Blog API is up and running.');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'An error occurred!' });
});


module.exports = app;
