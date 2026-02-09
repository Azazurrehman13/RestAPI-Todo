<div align="center">

# 📝 Todo REST API

### A Full-Stack Todo Application with Node.js, Express & PostgreSQL

[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v4.18-blue.svg)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v12+-blue.svg)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[Features](#-features) • [Installation](#-installation) • [API Documentation](#-api-documentation) • [Usage](#-usage)

</div>

---

## 📖 About

A complete full-stack todo application featuring a RESTful API built with Node.js and Express, PostgreSQL database for data persistence, and a clean vanilla JavaScript frontend. This project demonstrates modern web development practices with proper separation of concerns, error handling, and responsive design.

---

## ✨ Features

### Backend (REST API)
- ✅ **Full CRUD Operations** - Create, Read, Update, Delete todos
- 🔐 **Secure Database Queries** - Parameterized queries to prevent SQL injection
- 🌐 **RESTful Architecture** - Clean and standardized API endpoints
- ⚡ **Fast & Lightweight** - Built with Express.js
- 📊 **PostgreSQL Database** - Robust relational database with SERIAL primary keys
- 🔄 **CORS Enabled** - Cross-Origin Resource Sharing support
- 🛡️ **Error Handling** - Comprehensive error responses with proper HTTP status codes
- 📝 **Auto Timestamps** - Automatic creation timestamps for todos

### Frontend (Web Interface)
- 🎨 **Modern UI/UX** - Clean and intuitive design
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- ⚡ **Real-time Updates** - Dynamic DOM manipulation without page refresh
- ✏️ **Inline Editing** - Quick todo updates
- 🎯 **Task Completion** - Toggle complete/incomplete status
- 🌈 **Visual Feedback** - Loading states and success/error notifications

---

## 🛠️ Tech Stack

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **PostgreSQL** - Relational database
- **pg (node-postgres)** - PostgreSQL client
- **dotenv** - Environment variable management
- **cors** - Cross-Origin Resource Sharing

### Frontend
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

- **HTML5** - Markup
- **CSS3** - Styling with flexbox and grid
- **Vanilla JavaScript** - DOM manipulation and Fetch API

---

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** (v14.0.0 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v12.0 or higher) - [Download](https://www.postgresql.org/download/)
- **npm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)

---

## 🚀 Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/todo-rest-api.git
cd todo-rest-api
```

### 2️⃣ Install Dependencies

```bash
npm install
```

This will install:
- `express` - Web framework
- `cors` - CORS middleware
- `pg` - PostgreSQL client
- `dotenv` - Environment variables
- `nodemon` - Development auto-reload (dev dependency)

### 3️⃣ Configure Environment Variables

Navigate to the `todo-api-node` directory and create a `.env` file:

```bash
cd todo-api-node
```

Create `.env` file with the following content:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=todo_db
```

**⚠️ Important:** Replace `your_postgres_password` with your actual PostgreSQL password.

### 4️⃣ Set Up PostgreSQL Database

Open **SQL Shell (psql)** or **pgAdmin** and run:

```sql
-- Create the database
CREATE DATABASE todo_db;

-- Connect to the database
\c todo_db

-- Create the todos table
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Or** use the provided SQL script:

```bash
psql -U postgres -f todo-api-node/setup.sql
```

### 5️⃣ Start the Server

```bash
# Navigate back to project root
cd ..

# Start in production mode
npm start

# Or start in development mode (auto-restart on file changes)
npm run dev
```

✅ You should see:

```
✅ Server running on port 5000
📍 API available at http://localhost:5000
📍 Frontend available at http://localhost:5000
✅ PostgreSQL connected successfully
```

### 6️⃣ Access the Application

- **Frontend:** http://localhost:5000
- **API Base URL:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/api/health

---

## 📁 Project Structure

```
todo-rest-api/
│
├── node_modules/              # Dependencies (auto-generated)
│
├── public/                    # Frontend files
│   ├── index.html            # Main HTML file
│   ├── script.js             # Frontend JavaScript (Fetch API, DOM manipulation)
│   └── style.css             # CSS styles (responsive design)
│
├── todo-api-node/            # Backend files
│   ├── .env                  # Environment variables (not in repo)
│   ├── app.js                # Express app configuration & API routes
│   ├── db.js                 # PostgreSQL connection pool
│   ├── server.js             # Server entry point
│   └── setup.sql             # Database initialization script
│
├── .gitignore                # Git ignore file
├── package.json              # Project metadata & dependencies
├── package-lock.json         # Dependency lock file
├── LICENSE                   # MIT License
└── README.md                 # Project documentation
```

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/health` | API health check | - | `{ status: "API is running" }` |
| `GET` | `/todos` | Get all todos | - | Array of todo objects |
| `GET` | `/todos/:id` | Get single todo by ID | - | Single todo object |
| `POST` | `/todos` | Create new todo | `{ title, description }` | Created todo object |
| `PUT` | `/todos/:id` | Update todo | `{ title, description, completed }` | Updated todo object |
| `DELETE` | `/todos/:id` | Delete todo | - | `{ message: "Todo deleted successfully" }` |

---

### 📝 API Examples

#### 1. Health Check

**Request:**
```http
GET /api/health
```

**Response:**
```json
{
  "status": "API is running"
}
```

#### 2. Get All Todos

**Request:**
```http
GET /api/todos
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Learn Node.js",
    "description": "Complete REST API tutorial",
    "completed": false,
    "created_at": "2026-02-09T10:30:00.000Z"
  },
  {
    "id": 2,
    "title": "Build Frontend",
    "description": "Create todo app UI",
    "completed": true,
    "created_at": "2026-02-09T11:00:00.000Z"
  }
]
```

#### 3. Get Single Todo

**Request:**
```http
GET /api/todos/1
```

**Response:**
```json
{
  "id": 1,
  "title": "Learn Node.js",
  "description": "Complete REST API tutorial",
  "completed": false,
  "created_at": "2026-02-09T10:30:00.000Z"
}
```

**Error Response (404):**
```json
{
  "error": "Todo not found"
}
```

#### 4. Create New Todo

**Request:**
```http
POST /api/todos
Content-Type: application/json

{
  "title": "New Task",
  "description": "Task description"
}
```

**Response (201):**
```json
{
  "id": 3,
  "title": "New Task",
  "description": "Task description",
  "completed": false,
  "created_at": "2026-02-09T12:00:00.000Z"
}
```

**Validation Error (400):**
```json
{
  "error": "Title is required"
}
```

#### 5. Update Todo

**Request:**
```http
PUT /api/todos/1
Content-Type: application/json

{
  "title": "Updated Task",
  "description": "Updated description",
  "completed": true
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Updated Task",
  "description": "Updated description",
  "completed": true,
  "created_at": "2026-02-09T10:30:00.000Z"
}
```

#### 6. Delete Todo

**Request:**
```http
DELETE /api/todos/1
```

**Response:**
```json
{
  "message": "Todo deleted successfully"
}
```

**Error Response (404):**
```json
{
  "error": "Todo not found"
}
```

---

## 🧪 Testing the API

### Using cURL

```bash
# Health Check
curl http://localhost:5000/api/health

# Get all todos
curl http://localhost:5000/api/todos

# Get single todo
curl http://localhost:5000/api/todos/1

# Create a new todo
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy groceries","description":"Milk, eggs, bread"}'

# Update a todo
curl -X PUT http://localhost:5000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy groceries","description":"Milk, eggs, bread, cheese","completed":true}'

# Delete a todo
curl -X DELETE http://localhost:5000/api/todos/1
```

### Using Postman or Thunder Client

1. Import the API endpoints
2. Set base URL: `http://localhost:5000/api`
3. Test all CRUD operations
4. Verify response status codes and data

---

## 💻 Usage

### Frontend Features

1. **Add Todo:** Enter title and description, click "Add Todo"
2. **View Todos:** All todos are displayed in a list
3. **Complete Todo:** Click checkbox to mark as complete/incomplete
4. **Edit Todo:** Click edit button to modify title and description
5. **Delete Todo:** Click delete button to remove todo

### Database Schema

```sql
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,              -- Auto-incrementing ID
  title VARCHAR(255) NOT NULL,        -- Todo title (required)
  description TEXT,                   -- Todo description (optional)
  completed BOOLEAN DEFAULT FALSE,    -- Completion status
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Creation timestamp
);
```

---

## 🔒 Security Features

- ✅ **Parameterized Queries** - Prevents SQL injection attacks
- ✅ **Input Validation** - Server-side validation for required fields
- ✅ **Environment Variables** - Sensitive data stored securely in `.env`
- ✅ **CORS Configuration** - Controlled cross-origin access
- ✅ **Error Handling** - Safe error messages without exposing sensitive data

---

## 🚨 Troubleshooting

### Database Connection Error

**Error:** `password authentication failed for user "postgres"`

**Solutions:**
1. Verify PostgreSQL credentials in `.env` file
2. Ensure PostgreSQL service is running
3. Check database `todo_db` exists
4. Restart Node.js server after changing `.env`

```bash
# Windows - Check PostgreSQL service
services.msc

# Verify database exists
psql -U postgres -l
```

### Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solutions:**
```bash
# Windows - Find and kill process
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change PORT in .env
PORT=3000
```

### Module Not Found

**Error:** `Cannot find module 'express'`

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 🎯 Future Enhancements

- [ ] Search and filter functionality
- [ ] Todo categories/tags
- [ ] Due dates and priorities
- [ ] Pagination for large datasets
- [ ] User authentication (JWT)
- [ ] Dark mode toggle
- [ ] Export/import todos (JSON, CSV)
- [ ] REST API documentation with Swagger
- [ ] Unit and integration tests
- [ ] Docker containerization

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- [Express.js Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [REST API Design Guide](https://restfulapi.net/)

---

## ⭐ Show Your Support

If you found this project helpful, please give it a ⭐️ on GitHub!

---

<div align="center">

**Made with ❤️ and Node.js**

</div>
