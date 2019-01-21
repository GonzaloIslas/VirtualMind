var express = require('express');
var router = express.Router();
var User = require('../Models/User');
var mongoose = require('mongoose');


//test method
router.get('/signup', function(req, res, next) {
	res.render('signup');
});

router.post('/signup', function(req, res, next){

	var newUser = new User();
	newUser.firstname = req.body.firstname_user;
	newUser.lastname = req.body.lastname_user;
	newUser.email = req.body.email_user;
	newUser.password = req.body.password_user;

	//looking for a used email
	User.findOne({email: newUser.email}, function(err, user){
		if(err){
			console.log(err);
			return res.status(500).send();
		}

		if(user){
			return res.render('error',{
				message: 'Email taken'
			});
		}
	});

	newUser.save(function(err, savedUser){
		if(err){
			console.log(err);
			return res.status(500).send();
		}
		return res.status(200).send();
	});

	res.send(newUser);
});

//test method
router.get('/modifyuser', function(req, res, next) {
	res.render('modifyuser');
});

router.get('/modifyuser/:Email', function(req, res, next) {

	var newUser = new User();
	newUser.email = req.params.Email;
  
  //request to mongo
  User.findOne({email: email}, function(err, user){
  	if(err){
  		console.log(err);
  		return res.status(500).send();
  	}
  	if(!user){
  		return res.render('error',{
  			message: 'Email not taken'
  		});
  	}else{
  		return res.send(user);
  	}
  });
});

router.post('/modifyuser', function(req, res, next){
	
	var email = req.body.email_user;
	var password = req.body.password_user;
	var firstname = req.body.firstname_user;
	var lastname = req.body.lastname_user;
	
	//request a mongo
	User.updateOne({email: email, password: password},{$set: {
				firstname: firstname,
				lastname: lastname,
			}}, function(err, user){});

	User.findOne({email: email}, function(err, user){
		if(err){
			console.log(err);
			return res.status(500).send();
		}

		if(!user){
			return res.render('error',{
				message: 'User or password incorrect'
			});
		}else{
			res.status(202).send(user);
		}
	})
});

//test method
router.get('/deleteUser', function(req, res, next) {
	res.render('deleteUser');
});


router.post('/deleteUser', function(req, res, next){
	
	var newUser = new User();
	var email = req.body.email_user;
	var password = req.body.password_user;
	var firstname = req.body.firstname_user;
	var lastname = req.body.lastname_user;

	//looking for a user
	User.deleteOne({email: email, password: password}, function(err){
		console.log("am in bois");
		if(err){
			console.log(err);
			return res.status(500).send();
		}else{
			return res.status(202);
		}
	});

});


module.exports = router;