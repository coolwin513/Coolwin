
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

router.get('/balance', authMiddleware, async (req, res) => {
    const user = await User.findById(req.user.id);
    res.json({ balance: user.balance });
});

router.post('/deposit', authMiddleware, async (req, res) => {
    const { amount } = req.body;
    const user = await User.findById(req.user.id);
    user.balance += amount;
    await user.save();
    res.json({ balance: user.balance });
});

router.post('/withdraw', authMiddleware, async (req, res) => {
    const { amount } = req.body;
    const user = await User.findById(req.user.id);
    if (user.balance >= amount) {
        user.balance -= amount;
        await user.save();
        res.json({ balance: user.balance });
    } else {
        res.status(400).json('Insufficient balance');
    }
});

module.exports = router;
