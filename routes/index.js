//var express = require('express');
//var router = express.Router();
//
///* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});
//
//module.exports = router;


var express = require('express');
var passport = require('passport');
var Account = require('../models/userSchema');
var router = express.Router();

router.get('/getCatalog', function (req, res) {
  res.json({"error" : false,"message" : "Hello World"});
});

router.get('/register', function(req, res) {
  res.render('register', { });
});

router.post('/register', function(req, res, next) {
  Account.register(new Account({ username : req.body.username, email : req.body.email}), req.body.password, function(err, account) {
    if (err) {
      return res.render('register', { error : err.message });
    }
    passport.authenticate('local')(req, res, function () {
      req.session.save(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    });
  });
});


router.get('/login', function(req, res) {
  res.render('login', { user : req.user, error : req.flash('error')});
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), function(req, res, next) {
  req.session.save(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/home');
  });
});

router.get('/logout', function(req, res, next) {
  req.logout();
  req.session.save(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

router.get('/ping', function(req, res){
  res.status(200).send("pong!");
});

module.exports = router;