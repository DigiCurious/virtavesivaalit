var express = require('express');
var router = express.Router();
var Ehdokas = require('../models/ehdokas');
//var request = require('request');

router.use(require('cookie-parser')());
/* GET users listing. */


/* GET users listing. */
router.get('/', function(req,res,next){
	res.render("form");
});

router.post('/', function(req,res,next){
	
	  console.log("LOMAKKEEN TIEDOT " + req.body.teesi1 + " & " + req.body.teesi2);

	  var teesit = new Array;

	  teesit.push(req.body.teesi1);
	  teesit.push(req.body.teesi2);
	  teesit.push(req.body.teesi3);
	  teesit.push(req.body.teesi4);
	  teesit.push(req.body.teesi5);

	  var perustelut = new Array;

	  perustelut.push(req.body.perustelu1);
	  perustelut.push(req.body.perustelu2);
	  perustelut.push(req.body.perustelu3);
	  perustelut.push(req.body.perustelu4);
	  perustelut.push(req.body.perustelu5);

	  console.log("perustelut array = " + perustelut);
	  res.cookie('teesit', teesit);
	  res.cookie('perustelut', perustelut);
	  res.redirect("/register/confirmation");
})

router.get('/confirmation', ensureAuthenticated, function(req, res, next) {
	
	//console.log("COOKIE ON TÄÄLLÄ " + req.cookies.teesit);
	if(req.cookies){
		var teesit = JSON.stringify(req.cookies.teesit);
		var perustelut = JSON.stringify(req.cookies.perustelut);
	}
	console.log("PERUSTELUT ON = " + perustelut);
	var userid = req.user.userid
	var accesstoken = req.user.accesstoken
    var picture;
    //function graphApi(accesstoken, userid){
	var url = "https://graph.facebook.com/" + userid + "/picture?type=large";

					/*request(url, function (error, response, body) {
					  bodyObj = JSON.parse(body);
					  console.log("DATA OBJECT " + bodyObj);
					  //picture = String(bodyObj.picture.data.url);
					  console.log(picture);
					});*/
						  	
  
  res.render('confirmation', { user: req.user, url: url, teesit:JSON.parse(teesit), perustelut: JSON.parse(perustelut)});
});

router.post('/confirmation', function(req, res, next) {
  
  //console.log("TÄÄLLÄ ON KAIKKI DATA EHDOKKAASTA " + req.body);

  var puolue = req.body.puolue;
  var vaalipiiri = req.body.vaalipiiri;
  var name = req.body.nimi;
  var kuva = req.body.kuva;

  var teesit = new Array;
  teesit.push(req.body.teesi1);
  teesit.push(req.body.teesi2);
  teesit.push(req.body.teesi3);
  teesit.push(req.body.teesi4);
  teesit.push(req.body.teesi5);

  var perustelut = new Array;
  perustelut.push(req.body.perustelu1);
  perustelut.push(req.body.perustelu2);
  perustelut.push(req.body.perustelu3);
  perustelut.push(req.body.perustelu4);
  perustelut.push(req.body.perustelu5);

  var uusiehdokas = new Ehdokas({ puolue: puolue, vaalipiiri: vaalipiiri, name:name, kuva:kuva, teesit:teesit , perustelut: perustelut});
  uusiehdokas.save(function (err) {
  if (err){console.log(err)}else{
  	res.redirect('/kiitos');
  }
  });
 });

router.get('/kiitos', function(req,res,next){
	res.render("kiitosb");
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/auth/login');
}

module.exports = router;
