// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Other endpoints...
// Example in cartRoutes.js
router.get('/', async (req, res) => {
    try {
        const cartItems = await Cart.find();
        res.json(cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});


// Update quantity of a cart item
router.put('/:productName', async (req, res) => {
    try {
        const { productName } = req.params;
        const { quantity } = req.body;

        if (!quantity) {
            return res.status(400).json({ error: 'Quantity is required' });
        }

        const cartItem = await Cart.findOneAndUpdate(
            { productName },
            { quantity },
            { new: true }
        );

        if (!cartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        res.json(cartItem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update cart item', details: error.message });
    }
});

// Delete a cart item
router.delete('/:productName', async (req, res) => {
    try {
        const { productName } = req.params;

        const cartItem = await Cart.findOneAndDelete({ productName });

        if (!cartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        res.json({ message: 'Cart item deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete cart item', details: error.message });
    }
});

router.delete('/clear', async (req, res) => {
    try {
        await Cart.deleteMany({});
        res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to clear cart', error });
    }
});

module.exports = router;
