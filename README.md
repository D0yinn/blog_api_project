# Blog API

A simple and secure blogging API built with **Node.js**, **Express**, and **MongoDB**.  
It supports user authentication, blog post management (CRUD), filtering, pagination, ordering, reading time calculation, and is fully tested using **Jest** and **Supertest**.


## Features

- User registration and login with JWT authentication
- Create, read, update, delete blog posts
- Support for draft and published blog states
- Filter blogs by author, title, tags, and state
- Search, sort, and paginate blogs
- Reading time calculation for each blog
- Fully tested API endpoints (Jest + Supertest)


## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose

## Folder Structure
blog_api/
├── controllers/
├── middleware/
├── models/
├── routes/
├── tests/
├── utils/
├── .env
├── .gitignore
├── app.js
├── server.js
├── package.json
├── README.md


## Installation & Setup

1. **Clone the repository**  
   ```bash
   git clone <your-repo-url>
   cd project name

2. **Install dependencies**
npm install

3. **Create a .env file in the root directory and add the following:**
PORT=5000
MONGO_URI=your_mongodb_uri_here
JWT_SECRET=your_jwt_secret

4. Start the development server
npm run dev

## Running Tests ##
All endpoints are tested using Jest and Supertest.
npm test


## API Endpoints ##
**Auth Routes**
- POST /register — Register a new user

- POST /login — Log in and receive a token

**Blog Routes**
- POST /blogs — Create a new blog (authenticated)

- GET /blogs — Get all published blogs (with filter, sort, search, paginate)

- GET /blogs/:id — Get a single blog by ID

- PUT /blogs/:id — Update a blog (only the author)

- DELETE /blogs/:id — Delete a blog (only the author)

- PUT /blogs/:id/publish — Publish a draft blog


## Query Parameters (for GET /blogs) ##
-author

- title

- tags

- state (published | draft)

- orderBy=reading_time or orderBy=createdAt

- page and limit for pagination


## Status ##
Completed and ready for deployment or further improvements.


