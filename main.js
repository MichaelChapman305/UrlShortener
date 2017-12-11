const express = require('express');
const app = express();

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  console.log(req.protocol + '://' + req.get('host') + req.originalUrl);
  res.render('index');
});

app.get('/shorten', (req, res) => {
  res.render('shorten');
});

app.listen(process.env.PORT || 5000);