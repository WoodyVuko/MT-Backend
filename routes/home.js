/**
 * Created by Vuko on 25.04.16.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

module.exports = router;
