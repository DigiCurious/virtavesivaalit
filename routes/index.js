var express = require('express');
var router = express.Router();
var Ehdokas = require('../models/ehdokas');

/* GET home page. */

router.get('/privacy', function(req, res, next){
	res.render("privacy");
});

router.post('/', function(req,res){
	var puolue = "?puolue=" + req.body.puolue + "&"
	var vaalipiiri = "vaalipiiri=" + req.body.vaalipiiri
	res.redirect("/" + puolue + vaalipiiri);
})

router.get('/', function(req, res) {

  var puolue = String(req.query.puolue);
  var vaalipiiri = String(req.query.vaalipiiri);

  if(String(req.query.puolue) == "Kaikki"){
  	puolue = { $exists: true }
  }
  if(String(req.query.vaalipiiri) == "Kaikki"){
  	vaalipiiri = { $exists: true }
  }

  console.log(puolue)
  console.log(vaalipiiri)
  /*puolue = JSON.stringify(req.cookies.puolue);
  vaalipiiri = JSON.stringify(req.cookies.vaalipiiri);*/
 
  console.log(puolue);
  Ehdokas.find({$and:[{puolue: puolue},{vaalipiiri:{ $exists: true }}]}, function(err, ehdokkaat){
  	if(err){
  		console.log(err)
  	}else{
  		console.log(ehdokkaat);
  		console.log(puolue);
  		res.render("index", { ehdokkaat: ehdokkaat })
  	}
  });
  });



module.exports = router;
