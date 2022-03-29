// Dependencies
var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var app = express(); // create an instance of express

// Routing Files
var index = require('./server/routes/app');
const booksRoutes = require('./server/routes/books');
const authorsRoutes = require('./server/routes/authors');

// Connect to Mongo Database
mongoose.connect('mongodb://localhost:27017/library',
   { useNewUrlParser: true }, (err, res) => {
      if (err) {
         console.log('Connection failed: ' + err);
      }
      else {
         console.log('Connected to database!');
      }
   }
);

// Express POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(logger('dev')); // Tell express to use the Morgan logger

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// Tell express to use the specified directory as root
app.use(express.static(path.join(__dirname, 'dist/my-library')));

// Express map routing
app.use('/', index);
app.use('/books', booksRoutes);
app.use('/authors', authorsRoutes);

// Default route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/my-library/index.html'));
});

// Define the port address and tell express to use this port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function() {
  console.log('API running on localhost: ' + port)
});