
const mongoose = require('mongoose');
const GameSchema = new mongoose.Schema({
    userId: String,
    amount: Number,
    color: String
}, { timestamps: true });
module.exports = mongoose.model('Game', GameSchema);
