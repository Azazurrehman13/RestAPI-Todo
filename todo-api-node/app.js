const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from public directory (one level up)
app.use(express.static(path.join(__dirname, "..", "public")));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "API is running" });
});

// GET all todos
app.get("/api/todos", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM todos ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET single todo
app.get("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query("SELECT * FROM todos WHERE id = $1", [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST - create new todo
app.post("/api/todos", async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }
    
    const result = await db.query(
      "INSERT INTO todos (title, description) VALUES ($1, $2) RETURNING *",
      [title, description || null]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT - update todo
app.put("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    
    const result = await db.query(
      "UPDATE todos SET title = $1, description = $2, completed = $3 WHERE id = $4 RETURNING *",
      [title, description || null, completed ?? false, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE - remove todo
app.delete("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query("DELETE FROM todos WHERE id = $1 RETURNING *", [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }
    
    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Root route - serve frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;