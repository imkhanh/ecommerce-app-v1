require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// connect database
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => console.log('========= Mongoose connect successfully ========='))
	.catch((err) => console.log('Database not connect'));

// middleware
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + '/uploads'));

// routes
app.use('/api', require('./routes/authRoute'));

// run server

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port:::: ${PORT}`));
