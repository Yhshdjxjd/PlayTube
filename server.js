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
 
// Import necessary modules
const express = require('express');
const bcrypt = require('bcrypt'); // For password hashing
const bodyParser = require('body-parser');
const mysql = require('mysql'); // Assuming MySQL is your database

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost', // Replace with your DB host
  user: 'root',      // Replace with your DB username
  password: '',      // Replace with your DB password
  database: 'your_database_name' // Replace with your DB name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to the database.');
});

// Register route
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Check if any field is missing
  if (!username || !email || !password) {
    return res.status(400).send('Please fill in all fields.');
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // SQL query to insert user data
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [username, email, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error inserting user data:', err);
        return res.status(500).send('An error occurred while registering the user.');
      }
      res.status(201).send('User registered successfully!');
    });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).send('An error occurred during registration.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

