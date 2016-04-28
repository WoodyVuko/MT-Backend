/**
 * Created by Vuko on 25.04.16.
 */
var express = require('express');
var router = express.Router();
var xyz = ''

/* GET home page. */
router.get('/', function(req, res, next) {
  xyz = req.user.username;
  console.log('Username: ' + xyz);
//  console.log(req.user.username);
  res.render('home', { title: 'Express' });
});

module.exports = router;

