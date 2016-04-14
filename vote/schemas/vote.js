var mongoose = require('mongoose');

var VoteSchema = new mongoose.Schema({
	shareId: String,
	rate: Number,
	desc: String
});

VoteSchema.pre('save', function(next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}

	next();
})

VoteSchema.statics = {
	fetch: function(cb) {
		return this
			.find({})
			.exec(cb);
	},
	findByShareId: function(id, cb) {
		return this
			.findOne({shareId: id})
			.exec(cb);
	}
}

module.exports = VoteSchema