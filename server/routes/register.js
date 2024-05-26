const express = require('express');
const bodyParser = require('body-parser');
const { sql, poolPromise } = require('./database');

const app = express();
const port = 3000;

// Middlewares
app.use(bodyParser.json());

// Register a new user
app.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ message: 'Username and password and email are required' });
    }

    const pool = await poolPromise;

    // Check if user already exists
    const userResult = await pool
      .request()
      .input('username', sql.VarChar, username)
      .query(`SELECT * FROM Users WHERE username = '${username}'`);

    if (userResult.recordset.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Insert the new user into the database
    await pool
      .request()
      .input('username', sql.VarChar, username)
      .input('password', sql.VarChar, password)
      .input('email', sql.VarChar, email)
      .query(`INSERT INTO Users (username, password, email, role_id) VALUES 
      ('${username}', '${password}', '${email}'), customer`);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = router;
