const express = require('express');
const router = express.Router();
const CartItem = require("models/cartItem");  // Import the CartItem model

// Add item to cart
router.post('/', async (req, res) => {
    const { name, price } = req.body;

    try {
        // Check if item already exists in the cart
        let existingItem = await CartItem.findOne({ name });

        if (existingItem) {
            // If the item exists, increase its quantity
            existingItem.quantity += 1;
            await existingItem.save();
        } else {
            // If it does not exist, create a new item
            const newItem = new CartItem({ name, price, quantity: 1 });
            await newItem.save();
        }

        res.status(200).json({ message: `${name} added to the cart!` });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ error: 'Failed to add item to cart' });
    }
});

module.exports = router;
