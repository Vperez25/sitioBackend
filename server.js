const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cartRoutes = require('./api/cart');

dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));


app.use('/api/cart', cartRoutes);

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
