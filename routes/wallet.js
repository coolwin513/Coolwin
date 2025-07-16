const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 💰 GET wallet balance
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json({ wallet: user.wallet });
  } catch (err) {
    res.status(500).json({ error: 'Wallet fetch failed' });
  }
});

// 💸 ADD money to wallet
router.post('/add', async (req, res) => {
  const { userId, amount } = req.body;
  try {
    const user = await User.findById(userId);
    user.wallet += Number(amount);
    await user.save();
    res.json({ wallet: user.wallet });
  } catch (err) {
    res.status(500).json({ error: 'Add money failed' });
  }
});

module.exports = router;
