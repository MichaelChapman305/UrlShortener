const express = require('express');
const router = express.Router();
const Url = require('./models').Url;

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/shorten/:url(*)', (req, res, next) => {
  if (/([0-9][0-9][0-9][0-9])/g.test(req.params.url)) {
    Url.findOne({'shortened': req.params.url}, (err, doc) => {
      if(!doc) {
        res.send('Url cannot be found!');
      }else {
        res.redirect(doc.original); 
      }
    });
  }
  else if (req.params.url.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi) && req.params.url.indexOf('.') !== req.params.url.lastIndexOf('.')){
    req.originalUrl = req.params.url;
    req.shortUrl = Math.floor(Math.random() * (9999 - 1000) + 1000);

    Url.findOne({'shortened': req.shortUrl}, (err, doc) => {
      if (doc) {
        res.redirect('/shorten/:url(*)');
      }else {
        let newUrl = new Url({
          'original': req.originalUrl,
          'shortened': req.shortUrl
        });
        newUrl.save((err, url) => {
        res.send({'original': req.originalUrl, 'shortened': req.shortUrl});
        });
      } 
    });
  }else {
    res.send('Invalid Url. Url must start with "https://www.", and end with ".com" or another valid url ending');
  }
});

module.exports = router;

