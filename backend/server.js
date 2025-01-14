const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const upload = multer();

const productRoute = require('./routes/api/productRoute');

// MongoDB connection URI, using Docker service name for MongoDB
let mongodb_url = 'mongodb://app-ip-mongo/';  // Use the service name 'app-ip-mongo' as the MongoDB host in Docker
let dbName = 'yolomy';

// MongoDB URI with environment variable fallback
const MONGODB_URI = process.env.MONGODB_URI || mongodb_url + dbName;

// Connect to MongoDB with retry logic in case of failure
const connectWithRetry = () => {
    mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Database connected successfully');
        })
        .catch((error) => {
            console.error('Failed to connect to MongoDB, retrying...', error);
            setTimeout(connectWithRetry, 5000);  // Retry after 5 seconds if connection fails
        });
};

// Start the connection attempt
connectWithRetry();

const db = mongoose.connection;

// Check for DB Errors
db.on('error', (error) => {
    console.log(error);
});

// Initializing express
const app = express();

// Body parser middleware
app.use(express.json());

// Multer setup for file uploads
app.use(upload.array());

// CORS setup
app.use(cors());

// Use Route for product API
app.use('/api/products', productRoute);

// Define the PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
