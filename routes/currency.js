var express = require('express');
var router = express.Router();

var Request = require("request");

/* GET users listing. */
router.get('/Dolar', function(req, res, next) {
  	Request.get("https://www.bancoprovincia.com.ar/Principal/Dolar", (error, response, body) => {
   	 if(error) {
   	     return console.dir(error);
  	  }
  	  console.dir(JSON.parse(body));
  	  res.send(JSON.parse(body));
	});
});

router.get('/Pesos', function(req, res, next) {
  res.send(501);
});

router.get('/Real', function(req, res, next) {
  res.send(501);
});

module.exports = router;
