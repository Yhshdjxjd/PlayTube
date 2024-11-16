const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();

app.use(bodyParser.json());

// Dummy database
const users = [];

// User Registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.send('User registered successfully');
});

// User Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (user && (await bcrypt.compare(password, user.password))) {
    res.send('Login successful');
  } else {
    res.status(401).send('Invalid username or password');
  }
});

app.listen(3000, () => console.log('Server is running on port 3000'));