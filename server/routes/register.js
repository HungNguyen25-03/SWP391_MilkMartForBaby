const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const { registerUser } = require('../models/userModels');
const app = express();

// Middlewares
app.use(bodyParser.json());

// Register a new user
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const user = await registerUser(username, password, email);
    if (user.success) {
      res.status(200).json({ message: user.message });
    } else {
      res.status(409).json({ message: user.message });
    }
  } catch (error) {
    res.status(500).send('Error registering user');
  }
});

// Export the router
module.exports = router;
