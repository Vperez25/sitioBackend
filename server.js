const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cartRoutes = require('/api/cart');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());  // Middleware to parse JSON

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Use the cart route for handling requests to /api/cart
app.use('/api/cart', cartRoutes);

// Serve static files (like your HTML, CSS, and images)
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
