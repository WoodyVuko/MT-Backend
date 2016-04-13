var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var sName = mongoose.Schema({
  _id : String,
  name : String
},{collection : "test"});

var kitten = mongoose.model('DasHierIstDerMapper',sName);

/* GET users listing. */
router.get('/', function(req, res, next) {



  kitten.find(function(err, names){
    if (err) return console.error(err);
    console.log(names);
    res.json(names);
    console.log("test");
    // here ...
  });


});


module.exports = router;

