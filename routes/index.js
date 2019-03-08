var express = require('express');
var router = express.Router();
var Ehdokas = require('../models/ehdokas');

/* GET home page. */

router.get('/privacy', function(req, res, next){
	res.render("privacy");
});

router.get('/', function(req, res) {
  Ehdokas.find({}, function(err, ehdokkaat){
  	if(err){
  		console.log(err)
  	}else{
  		//console.log(ehdokkaat[3].kuva);
  		res.render("index", { ehdokkaat: ehdokkaat})
  	}
  });
});

module.exports = router;
