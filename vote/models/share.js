var mongoose = require('mongoose');
var ShareSchema = require('../schemas/share');
var Share = mongoose.model('Share', ShareSchema)

module.exports = Share;