require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

// Middleware
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
    useFindAndModify: false,
  })
  .then(() => console.log('Mongodb::::::::::: Connected'))
  .catch((err) => console.log('Database Not Connected !!!'));

// Routes
app.use('/api', require('./routes/auth'));
app.use('/api/category', require('./routes/categories'));
app.use('/api/product', require('./routes/products'));
app.use('/api/user', require('./routes/users'));
app.use('/api/customize', require('./routes/customizes'));
app.use('/api/order', require('./routes/orders'));
app.use('/api/braintree', require('./routes/braintree'));

if (process.env.NODE_ENV === 'production') {
  //*Set static folder up in production
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

// Run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port:::: ${PORT}`);
});
