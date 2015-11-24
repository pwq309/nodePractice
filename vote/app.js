
/**
 * Module dependencies.
 */

var express = require('express');
var port = process.env.PORT || 3123;
var path = require('path');
var mongoose = require('mongoose');
var _ = require('underscore');
var Share = require('./models/share')
var app = express();

mongoose.connect('mongodb://localhost/vote');

// all environments
app.set('views', './views/pages');
app.set('port', port);
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower')));
app.locals.moment = require('moment');
app.listen(port);

console.log('imooc started on port ' + port);
	
//index page
app.get('/', function(req, res) {
	Share.fetch(function(err, shares) {
		if(err) {
			console.log(err);
		}
		res.render('index', {
			title: 'vote 首页',
			shares: shares
		})
	})
})

//detail page
app.get('/share/:id', function(req, res) {
	var id = req.params.id;
	Share.findById(id, function (err, share) {
		res.render('detail', {
			title: 'vote ' + share.title,
			share: share
		})
	})
	
})

//admin page
app.get('/admin/share', function(req, res) {
	res.render('admin', {
		title: '分享后台录入页',
		share: {
			title: '',
			author: '',
			link: '',
			date: '',
			summary: ''
		}
	})
})

// admin update share
app.get('/admin/update/:id', function(req, res){
	var id = req.params.id;

	if (id) {
		Share.findById(id, function(err, share) {
			res.render('admin', {
				title: 'vote 后台更新页面',
				share: share
			})
		})
	}
})

//admin post share
app.post('/admin/share/new', function(req, res) {

	var id = req.body.share._id;
	var shareObj = req.body.share;
	var _share;

	if (id !== 'undefined') {
		Share.findById(id, function(err, share) {
			if(err) {
				console.log(err);
			}

			_share = _.extend(share, shareObj);
			_share.save(function(err, share) {
				if(err) {
					console.log(err);
				}

				res.redirect('/share/' + share._id);
			})
		})
	} else {
		_share = new Share({
			title: shareObj.title,
			author: shareObj.author,
			link: shareObj.link,
			date: new Date(shareObj.date),
			summary: shareObj.summary
		})

		_share.save(function(err, share) {
			if(err) {
				console.log(err);
			}
			res.redirect('/share/' + share._id)
		})
	}

})

//list page
app.get('/admin/list', function(req, res) {
	Share.fetch(function(err, shares) {
		if(err) {
			console.log(err);
		}
		res.render('list', {
			title: 'vote 列表页',
			shares: shares
		})
	})
	
})