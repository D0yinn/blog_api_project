# Blog API

A simple and secure blog API built with **Node.js**, **Express**, and **MongoDB**.  
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
│   └── blogController.js
│   └── authController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   └── Blog.js
│   └── User.js
│
├── routes/ 
│   └── blogRoutes.js
│   └── authRoutes.js
│
├── tests/
│   └── blog.test.js
│   └── auth.test.js
│
├── utils/
│   └── readingTime.js
│
├── .env 
├── .gitignore
├── app.js
├── server.js
├── package.json
└── README.md

## Installation & Setup

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd your project name
```

2. **Install dependencies**

```bash
npm install
```

3. **Set environment variables**
   Create a `.env` file in the root directory and add the following:

```env
PORT=5000
MONGO_URI=<your-mongo-db-uri>
JWT_SECRET=<your-secret-key>
```

4. **Start the server**

```bash
npm start
```

5. **Run tests**

```bash
npm test
```


## API Documentation

### Base URL

http://localhost:5000/api


### Authentication

* **Register:** `POST /auth/register`
* **Login:** `POST /auth/login`

Use the returned token as:

```http
Authorization: Bearer <token>
```


### Blog Endpoints

#### Create Blog

* `POST /blogs`
* **Auth Required:** Yes
* **Body:**

```json
{
  "title": "The Power of the Girl Child",
  "description": "Short insight on empowering girls",
  "body": "Educating and empowering the girl child...",
  "tags": ["education", "girl child", "empowerment"]
}
```

#### Get All Published Blogs

* `GET /blogs`
* **Auth Required:** No
* **Query Params:**

  * `title` (optional)
  * `tags` (optional, comma-separated)
  * `author` (optional, ID)
  * `order_by` = `reading_time` | `read_count` | `timestamp`
  * `page` (default: 1)
  * `limit` (default: 20)

#### Get Blog by ID

* `GET /blogs/:id`
* **Auth Required:** Yes (for drafts)

#### Update Blog

* `PUT /blogs/:id`
* **Auth Required:** Yes (owner only)

#### Delete Blog

* `DELETE /blogs/:id`
* **Auth Required:** Yes (owner only)

#### Publish Blog

* `PATCH /blogs/:id/publish`
* **Auth Required:** Yes (owner only)

---

## Testing

* Run all tests with:

```bash
npm test
```

* Blog and Authentication tests are defined in the `tests/` folder using **Jest** and **Supertest**.


## Status ##
Completed and ready for deployment or further improvements.


