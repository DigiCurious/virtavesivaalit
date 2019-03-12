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
	res.redirect("/" + puolue + vaalipiiri + "#ehdokkaatt");
})


router.get('/', function(req,res){
  res.render('kiitos');
})

router.get('/etusivu2503', function(req, res) {
  
  function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }
  console.log(req.query);

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
 
  if(isEmpty(req.query)){
  	  console.log("etsi kaikki");
	  Ehdokas.find({}, function(err, ehdokkaat){
	  	if(err){
	  		console.log(err)
	  	}else{
	  		console.log(ehdokkaat);
	  		console.log(puolue);
	  		res.render("index", { ehdokkaat: ehdokkaat })
	  	}
  })
	}else{
		console.log("etsi hakuehdoilla");
		Ehdokas.find({$and:[{puolue: puolue},{vaalipiiri:vaalipiiri}]}, function(err, ehdokkaat){
	  	if(err){
	  		console.log(err)
	  	}else{
	  		console.log(ehdokkaat);
	  		console.log(puolue);
	  		res.render("index", { ehdokkaat: ehdokkaat })
	  	}
	  });
  }
});

router.get("/ehdokas/:id", function(req,res){
    Ehdokas.findById(req.params.id, function(err, ehdokas){
        if(err){
            console.log(err);
        }else{
            res.render("ehdokas", {ehdokas: ehdokas});
        }
    });
});



module.exports = router;
