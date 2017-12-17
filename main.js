const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const jsonParser = require('body-parser').json;
const app = express();

app.use(jsonParser());

app.set('view engine', 'pug');

mongoose.connect('mongodb://localhost:27017/url-shortener', {
  useMongoClient: true
});

const db = mongoose.connection;
mongoose.Promise = global.Promise;

app.use(routes);

db.on('error', function(err) {
  console.error('connection error:', err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
  	error: {
  	  message: err.message
  	}
  });
});

app.listen(process.env.PORT || 5000);
