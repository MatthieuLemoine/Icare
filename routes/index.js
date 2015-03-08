var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Marker = mongoose.model('Marker');
var User = mongoose.model('User');
var passport = require('passport');
/* Penser à mettre des messages flash pour la redirection */
var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.send('Vous devez vous logger');
}
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});
/* GET Login */
router.get('/login',function(req,res){
	res.redirect('/#/login');
})
/* GET Markers for GMaps */
router.get('/markers',function(req,res){
	Marker.find(function(err,markers){
		var markers_send=[];
		markers.forEach(function(marker,i,array){
			User.findById(marker.user,function(err,user){
				if(err)
					res.json(err);
				marker_send={
					"longitude" : marker.longitude,
					"latitude" : marker.latitude,
					"nombreBornes" : marker.nombreBornes,
					"nom" : user.nom,
					"prenom" : user.prenom,
					"_id" : marker._id
				}
				markers_send.push(marker_send);
				if(i==array.length-1){
					res.json(markers_send);
				}
			});
		});
	});
});
/* GET Marker */
router.get('/marker/:id',isAuthenticated,function(req,res){
	var marker_send={};
	Marker.findById(req.params.id,function(err,marker){
		if(err)
			res.json(err);
		if(marker==null){
			res.send("Mauvais marqueur");
		}
		else{
			User.findById(marker.user,function(err,user){
				if(err)
					res.json(err);
				marker_send={
					"longitude" : marker.longitude,
					"latitude" : marker.latitude,
					"nombreBornes" : marker.nombreBornes,
					"nom" : user.nom,
					"prenom" : user.prenom,
					"adresse" : marker.adresse,
					"username" : user.username
				};
				res.json(marker_send);
			});
		}
	});
});
/* GET Number of Users */
router.get('/nombreUsers',function(req,res){
	User.find().count(function(err,count){
		if(err)
			res.json(err);
		res.json(count);
	});
});
/* GET Number of bornes */
router.get('/nombreBornes',function(req,res){
	var nombreBornes=0;
	User.find(function(err,users){
		users.forEach(function(element,index,array){
			nombreBornes+=element.nombreBornes;
		});
		res.json(nombreBornes);
	});
});
/* GET User List */
router.get('/users',function(req,res){
	User.find().select("nom prenom -_id").exec(function(err,users){
		if(err)
			res.json(err);
		res.json(users);
	});
});
/* GET My info */
router.get('/myInfo',isAuthenticated,function(req,res){
	var user_id = req.session.userID;
	User.findById(user_id,function(err,user){
		if(err)
			res.json(err);
		res.json(user);
	});
});
/* GET My markers */
router.get('/myMarkers',isAuthenticated,function(req,res){
	var user_id = req.session.userID;
	Marker.find({user : user_id},function(err,markers){
		if(err)
			res.json(err);
		res.json(markers);
	});
});
/* POST New Marker */
router.post('/ajouterBorne',isAuthenticated,function(req,res){
	var user_id=req.session.userID;
	User.findById(user_id,function(err,user){
		if (err)
			res.json(err);
		var marker=new Marker();
		marker.latitude=req.body.latitude;
		marker.longitude=req.body.longitude;
		marker.nombreBornes=req.body.nombreBornes;
		marker.adresse=req.body.adresse;
		user.nombreBornes+=marker.nombreBornes;
		marker.user=user;
		marker.save(function(err,marker){
			if (err)
				res.json(err);
			user.save(function(err,user){
				if(err)
					res.json(err);
				res.send('Marker ajouté');
			})
		})
	});
});
/* UPDATE Marker */
router.put('/modifierMarker',isAuthenticated,function(req,res){
	var user_id=req.session.userID;
	User.findById(user_id,function(err,user){
		if (err)
			res.json(err);
		Marker.findById(req.body._id,function(err,marker){
			if(err)
				res.json(err);
			if(marker==null){
				res.send('Marker does not exist');
			}
			else{
				user.nombreBornes+=req.body.nombreBornes-marker.nombreBornes;
				marker.nombreBornes=req.body.nombreBornes;
				marker.save(function(err,marker){
					if (err)
						res.json(err);
					user.save(function(err,user){
						if(err)
							res.json(err);
						res.json('Marker modifié');
					})
				});
			}
		})
	});
});
/* DELETE Marker */
router.post('/supprimerMarker',isAuthenticated,function(req,res){
	var user_id=req.session.userID;
	console.log(req.body._id);
	User.findById(user_id,function(err,user){
		if (err)
			res.json(err);
		Marker.findById(req.body._id,function(err,marker){
			if(err)
				res.json(err);
			if(marker==null){
				res.send('Marker does not exist');
			}
			else{
				user.nombreBornes=user.nombreBornes-marker.nombreBornes;
				user.save(function(err,user){
					if (err)
						res.json(err);
					marker.remove(function(err,marker){
						if(err)
							res.json(err);
						res.send('Marker supprimé');
					})
				});
			}
		})
	});
});
/* Handle Login POST */
router.post('/login', passport.authenticate('login', {failureFlash : true }),function(req,res){
	User.findOne({username : req.user.username},function(err,user){
		if(err)
			res.json(err);
		req.session.userID=user._id;
		res.send('Connexion réussie');
	});
});
/* Handle  SignUp POST */
router.post('/signup', passport.authenticate('signup'),function(req,res){
	User.findOne({username : req.body.username},function(err,user){
		if(err)
			res.json(err);
		req.session.userID=user._id;
		res.send('Nouveau membre créé');
	});
});
/* Handle Logout */
router.get('/signout', function(req, res) {
  req.logout();
  res.redirect('/');
});
module.exports = router;
