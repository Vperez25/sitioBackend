const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from a .env file (in development)
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Serve static files from the public folder
app.use(express.static('public'));

// Include API routes
const cartRoutes = require('./api/cart');
const checkoutRoutes = require('./api/checkout');

app.use('/api/cart', cartRoutes);       // Cart-related endpoints
app.use('/api/checkout', checkoutRoutes);  // Payment/checkout-related endpoints

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
