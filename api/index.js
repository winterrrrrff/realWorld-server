require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path')
const PORT = process.env.PORT || 4000;
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('../config/corsOptions');
const connectDB = require('../config/dbConnect');
const mongoose = require('mongoose');

console.log(process.env.NODE_ENV);
connectDB();

app.use(cors(corsOptions));
app.use(express.json()); // middleware to parse json
app.use(cookieParser());

// static route
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/', require('../routes/root'));

// user routes - for testing
app.use('/test', require('../routes/testRoutes'));

// user routes - for /api/users and /api/user
app.use('/api', require('../routes/userRoutes'));

// user routes - for profiles
app.use('/api/profiles', require('../routes/profileRoutes'));

// article routes
app.use('/api/articles', require('../routes/articleRoutes'));

// tag route
app.use('/api/tags', require('../routes/tagRoutes'));

// comment routes
app.use('/api/articles', require('../routes/commentRoutes'));



mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

mongoose.connection.on('error', err => {
    console.log(err);
})

module.exports = app;
