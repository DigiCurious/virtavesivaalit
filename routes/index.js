var express = require('express');
var router = express.Router();
var Ehdokas = require('../models/ehdokas');

/* GET home page. */

router.get('/privacy', function(req, res, next){
	res.render("privacy");
});

router.get('/', function(req, res) {
  
  var puolue;
  var vaalipiiri;

  puolue = JSON.stringify(req.cookies.puolue);
  vaalipiiri = JSON.stringify(req.cookies.vaalipiiri);
 
  console.log(puolue);

  Ehdokas.find({}, function(err, ehdokkaat){
  	if(err){
  		console.log(err)
  	}else{
  		console.log(ehdokkaat);
  		console.log(puolue);
  		res.render("index", { ehdokkaat: ehdokkaat })
  	}
  });
  });

router.post('/', function(req,res){
	var puolue = req.body.puolue
	var vaalipiiri = req.body.vaalipiiri

	res.cookie('puolue', puolue);
	res.cookie('vaalipiiri', vaalipiiri);
	res.redirect("/");
})

module.exports = router;
