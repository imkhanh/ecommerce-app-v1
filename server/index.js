require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

// Database connection
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => console.log('Mongodb::::::::::: Connected'))
	.catch((err) => console.log('Database Not Connected !!!'));

// Routes

app.use('/api', require('./routes/auth'));

// Middleware
const PORT = process.env.PORT || 5000;

// Run server
app.listen(PORT, () => {
	console.log(`Server running on port:::: ${PORT}`);
});
