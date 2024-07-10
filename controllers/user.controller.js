const { User } = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//  register a new user
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  log in an existing user
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
     // Compare the provided password with the user's stored password
    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET);
      // Respond with the access token
       res.json({ accessToken });
    } else {
      res.status(401).json({ message: 'Authentication failed' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export the controller functions
module.exports = { registerUser, loginUser };
