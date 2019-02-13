//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var EhdokasSchema = new Schema({
  name: String,
  kuva: String,
  puolue: String,
  vaalipiiri: String,
  teesit: Array,
  perustelut: Array
});

// Compile model from schema
module.exports = mongoose.model('Ehdokas', EhdokasSchema );''