const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port= process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs')

app.use((req,res,next) => {
  var now = new Date().toString();
  var log=`${now} ${req.method} ${req.path}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log'); // must method otherwise it will give error callback must be a function
    }
  })
  next();
} )

app.use((req,res,next) => {
  // res.render('maintenance.hbs')
  next();
})

app.use(express.static(__dirname + '/public')); //Use  middleware function to use static files

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
 return text.toUpperCase();
});
// We can register a handler using app.get() This is going to let us set up a handler for an http get request..
//There's two arguments we have to pass in to get the first one is going to be the u r l.
// In our case we're looking for the root of the app so we can just use forward slash.
// And the second argument and this is going to be the function to run the function that
// tells express what to send back to the person who made the request.

//The first one is request and the second one is response for Questa
 // stores a ton of information about the request coming in things like the headers that were used.
 // Any body information the method that was made with the request to the path all of that is stored in here
 // The second argument response has a bunch of methods available to you.So you can respond to the HTP request in whatever way you like.
app.get('/', (req,res) => {
// res.send('<h1>Hello Express<h1>')
// res.send({
//   name: 'Rishabh',
//   likes: ['Jaipur','Pune']
// })
 res.render('home.hbs',{
   pageTitle:'Home Page',
   currentYear: new Date().getFullYear(),
   welcomeMessage: 'Welcome to website'
 })
});
app.get('/about', (req, res) => {
  res.render('about.hbs',{
    pageTitle:'About Page',
    currentYear: new Date().getFullYear()
  });
})

app.get('/project', (req , res) => {
  res.render('project.hbs',{
    pageTitle: 'Projects'
  });
});

app.get('/bad', (req,res) => {
  res.send({
    error:'Unable to handle request'
  })
})
app.listen(port, () => {
  console.log(`Server is up on Port ${port}`);
});
