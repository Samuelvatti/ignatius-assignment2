const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
});

module.exports = mongoose.model('Cart', cartSchema);
