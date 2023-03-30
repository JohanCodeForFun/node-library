const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes');

// load .env
require('dotenv').config()

// express app
const app = express();

// connect to mongodb
mongoose.connect(process.env.MONGO_dbURI)
	.then((result) => app.listen(3000))
	.catch((err) => console.log(err));

// Register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
	res.redirect('/books')
})

// book routes
app.use('/books', bookRoutes);

app.get('/about', (req, res) => {
	res.render('about', { title: 'about' });
})


// 404 page
app.use((req, res, next) => {
	res.status(404).render('404', { title: '404' })
})