const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
});

const MenuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    items: [MenuItemSchema],
});

module.exports = mongoose.model('Menu', MenuSchema);
