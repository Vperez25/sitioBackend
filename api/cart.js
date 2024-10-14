const express = require('express');
const router = express.Router();
const Product = require('../models/Product');  // Import Mongoose Product model

// Get cart items
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Add item to cart
router.post('/', async (req, res) => {
    const { name, price, quantity } = req.body;
    try {
        const newProduct = new Product({ name, price, quantity });
        await newProduct.save();
        res.json(newProduct);
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: 'Failed to add product', details: error.message });
    }
});

// Update item quantity
router.put('/:id', async (req, res) => {
    const { quantity } = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { quantity }, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
    }
});

// Delete item from cart
router.delete('/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product removed' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove product' });
    }
});

module.exports = router;
