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

	  console.log("teesit array = " + teesit);
	  res.cookie('teesit', teesit);
	  res.redirect("/register/confirmation");
})

router.get('/confirmation', ensureAuthenticated, function(req, res, next) {
	
	//console.log("COOKIE ON TÄÄLLÄ " + req.cookies.teesit);
	if(req.cookies){
		var teesit = JSON.stringify(req.cookies.teesit);
	}
	console.log("TEESIT ON = " + teesit);
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
						  	
  
  res.render('confirmation', { user: req.user, url: url, teesit:JSON.parse(teesit)});
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


  var uusiehdokas = new Ehdokas({ puolue: puolue, vaalipiiri: vaalipiiri, name:name, kuva:kuva, teesit:teesit });
  uusiehdokas.save(function (err) {
  if (err){console.log(err)}else{
  	res.redirect('/');
  }
  });
 });


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/auth/login');
}

module.exports = router;
