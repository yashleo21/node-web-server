const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+ '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;


  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  next();

});

// app.use((req, res, next) => {
//
//   res.render('maintenance.hbs', {
//     timeLeft: '1'
//   });
//
// });

app.use(express.static(__dirname + '/public')); //app.use is for middleware

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {

  // res.send('<h1>Hello Express! </h1>');
  res.render('home.hbs', {
    pageTitle: 'Political Central Daily',
    welcomeMessage: 'Welcome to dynamically generated Poltiical central page.'
  })

  // res.send({
  //   name: 'Vattghern',
  //   employed: 'NOPE LUL',
  //   hobbies: 'Memer and developer',
  //   likes: ['A','B','C']
  // });

});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page Central'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage : 'Error handling request :('
  });
});

app.get('/project', (req, res) => {
  res.render('project.hbs', {
    pageTitle: 'Project Page Central'
  });
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
