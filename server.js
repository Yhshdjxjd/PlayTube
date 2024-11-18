node server.js

const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to the database!');
});

// Register User Route
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Check if user already exists
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
    if (err) throw err;
    if (result.length > 0) return res.status(400).json({ message: 'User already exists!' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
      [username, email, hashedPassword], (err, result) => {
        if (err) throw err;
        res.status(201).json({ message: 'User created successfully!' });
      });
  });
});

// Login User Route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
    if (err) throw err;
    if (result.length === 0) return res.status(400).json({ message: 'User not found!' });

    // Compare password
    const validPassword = await bcrypt.compare(password, result[0].password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid password!' });

    // Generate JWT Token
    const token = jwt.sign({ userId: result[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Logged in successfully!', token });
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});

