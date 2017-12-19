const express = require('express');
const router = express.Router();
const Url = require('./models').Url;
const regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/shorten/:url(*)', (req, res) => {
  if (/([0-9][0-9][0-9][0-9])/g.test(req.params.url)) {
    Url.findOne({'shortened': req.params.url}, (err, doc) => {
      if (!doc) {
        res.send('Url cannot be found!');
      } else {
        res.redirect(doc.original); 
      }
    });
  }
  else if (regex.test(req.params.url)) {
    const originalUrl = req.params.url;
    const shortUrl = Math.floor(Math.random() * (9999 - 1000) + 1000);

    Url.findOne({'shortened': shortUrl}, (err, doc) => {
      if (doc) {
        res.redirect('/shorten/:url(*)');
      } else {
        const urlObj = {
          'original': originalUrl,
          'shortened': shortUrl
        };
        const newUrl = new Url(urlObj);

        newUrl.save((err, url) => {
          res.send(urlObj);
        });
      } 
    });
  } else {
    res.send('Invalid Url. Url must start with "https://www.", and end with ".com" or another valid url ending');
  }
});

module.exports = router;
