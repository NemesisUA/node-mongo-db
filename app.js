const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const blogRoutes = require('./routes/blogRoutes')

const app = express();

// connect to mongodb & listen for requests
const dbURI = 'mongodb+srv://testuser:test123@blog1.pvdtv7x.mongodb.net/blog1';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(app.listen(3000))
  .catch(error => console.log(error));

app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get('/', (req, res) => {  
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blogs
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });  
})
