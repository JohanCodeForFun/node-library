const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes');

// express app
const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://database-practice:LearningMERN2023@cluster0.nl10569.mongodb.net/library-db?retryWrites=true&w=majority';
mongoose.connect(dbURI)
	.then((result) => app.listen(3004))
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