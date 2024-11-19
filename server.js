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

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).send('Please provide email and password.');
  }

  // Find the user in the database
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).send('An error occurred while logging in.');
    }

    if (results.length === 0) {
      return res.status(404).send('User not found.');
    }

    const user = results[0];

    // Compare the password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Invalid email or password.');
    }

    // If valid, respond with success message (or a token for further authentication)
    res.status(200).send('Login successful!');
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

// Signup route
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  // Check if all fields are provided
  if (!username || !email || !password) {
    return res.status(400).send('Please fill in all fields.');
  }

  try {
    // Check if the user already exists
    const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkUserQuery, [email], async (err, results) => {
      if (err) {
        console.error('Error checking user:', err);
        return res.status(500).send('An error occurred.');
      }

      if (results.length > 0) {
        return res.status(409).send('User already exists.');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the user into the database
      const insertQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      db.query(insertQuery, [username, email, hashedPassword], (err, result) => {
        if (err) {
          console.error('Error inserting user:', err);
          return res.status(500).send('An error occurred while signing up.');
        }

        res.status(201).send('Signup successful!');
      });
    });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).send('Internal server error.');
  }
});
