// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Route to add a new user
router.post('/addUser', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to get all user data
router.get('/getAllUser', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
}
});


// Update a user
router.put('/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { username, email } = req.body;

  try {
      const updatedUser = await User.findByIdAndUpdate(userId, { username, email }, { new: true });
      if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json(updatedUser);
  } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a user
router.delete('/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
  } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
