const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UrlSchema = new Schema({
  'original': String,
  'shortened': Number
});

const Url = mongoose.model('Url', UrlSchema);

module.exports.Url = Url;