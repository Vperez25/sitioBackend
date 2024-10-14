const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Checkout and create a payment intent
router.post('/', async (req, res) => {
    const { items, total } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total * 100,  // Convert dollars to cents
            currency: 'usd',
            payment_method_types: ['card']
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: 'Payment failed' });
    }
});

module.exports = router;
