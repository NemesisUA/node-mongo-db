const express = require('express');

const app = express();

app.listen(3000);

app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));

app.get('/', (req, res) => {
  const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];
  res.render('index', {title: 'Home', blogs});
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

//redirect 301
app.get('/about-us', (req, res) => {
  res.redirect('/about');
})

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
})

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });  
})
