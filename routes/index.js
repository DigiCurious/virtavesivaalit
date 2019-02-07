var express = require('express');
var router = express.Router();
var Ehdokas = require('../models/ehdokas');

/* GET home page. */

router.get('/tulemukaan', function(req, res, next){
	res.render("form");
});

router.post('/tulemukaan', function(req, res, next){
	var teesit = req.body
	res.redirect('/register', { teesit:teesit })
});

router.get('/', function(req, res) {
  Ehdokas.find({}, function(err, ehdokkaat){
  	if(err){
  		console.log(err)
  	}else{
  		console.log(ehdokkaat[3].kuva);
  		res.render("index", { ehdokkaat: ehdokkaat})
  	}
  });
});

module.exports = router;
