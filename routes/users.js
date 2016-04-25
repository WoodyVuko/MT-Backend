var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var sName = mongoose.Schema({
  _id : String,
  username : String
},{collection : "accounts"});

// var Personen = mongoose.model('DasHierIstDerMapper',sName);
var Person = mongoose.model('Person', sName);

/* GET users listing. */
router.get('/', function(req, res, next) {


/* Totaler Inhalt (JSON) von names ...
  Personen.find(function(err, names){
    res.json(names);
*/

// Finde Person mit 'Username' = temp und gib _id  bzw. _id UND username zurück
// Person.findOne({ 'username': 'temp' }, '_id', function (err, person) {
  Person.findOne({ 'username': 'temp' }, 'username',  '_id', function (err, person) {
    if (err) return handleError(err);
    console.log('%s has the _id: %s.', person.username, person._id )// temp has the _id: 571dd0d1bc3b1eff7151e2be.
    //res.valueOf().username;
    res.json(person);
  })


});


module.exports = router;

