
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashed, balance: 0 });
    await newUser.save();
    res.status(201).json('User registered');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json('User not found');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json('Wrong password');
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
});

module.exports = router;
