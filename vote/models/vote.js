var mongoose = require('mongoose');
var VoteSchema = require('../schemas/vote');
var Vote = mongoose.model('vote', VoteSchema)

module.exports = Vote;