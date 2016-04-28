var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var crypto = require('crypto');
var SERVER_SECRET = "liefbnewobgkjweb";

function encrypt(text){
  var cipher = crypto.createCipher('aes-256-cbc', SERVER_SECRET);
  var crypted = cipher.update(text,'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(text){
  if (text === null || typeof text === 'undefined') {return text;};
  var decipher = crypto.createDecipher('aes-256-cbc', SERVER_SECRET);
  var dec = decipher.update(text,'hex','utf8');
  dec += decipher.final('utf8');
  return dec;
}

//
//var sName = mongoose.Schema({
//  _id: String,
//  username : String
//  //email : String,
//  //password: String
//},{collection : "accounts"});
//
//
//// var Personen = mongoose.model('DasHierIstDerMapper',sName);
//var Person = mongoose.model('Person', sName);


// User-Register
/******************************************/
var userSchema  = mongoose.Schema({
  "password" : {type: String, get: decrypt, set: encrypt},
  "username" : String,
  "email" : String

},{collection : "accounts"});
/*****************************************/
var temp = mongoose.model('user_login',userSchema);

/********* Get all Users  **********************/
/***********************************************/

router.route("/all")
    .get(function(req,res){
      var response = {};
      temp.find({},function(err,data){
        // Mongo command to fetch all data from collection.
        if(err) {
          response = {"error" : true,"message" : "Error fetching data"};
        } else {
          response = {"error" : false,"message" : data};
        }
        res.json(response);
      });
    });

/********* Register a User  ********************/
/***********************************************/

router.route("/register")
    .get(function(req,res){
      //------------------------------------------------------
    })
    .post(function(req,res){
      var db = new temp;
      var response = {};
      // fetch email and password from REST request.
      // Add strict validation when you use this in Production.
      db.username = req.body.username;
      db.email = req.body.email;
      // Hash the password using SHA1 algorithm.
      db.password = req.body.password;
      console.log(db);
      db.save(function(err){
        // save() will run insert() command of MongoDB.
        // it will add new data in collection.
        if(err) {
          response = {"error" : true,"message" : "Error adding data"};
          console.log(err);
        } else {
          response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
      });
    });


/********* Find Users by ID ********************/
/***********************************************/

router.route("/find/:id")
    .get(function(req,res){
      var response = {};
      temp.findById(req.params.id,function(err,data){

        // This will run Mongo Query to fetch data based on ID.
        if(err) {
          response = {"error" : true,"message" : "Error fetching data"};
        } else {
          response = {"error" : false,"message" : data};
          console.log(data);
        }
        res.json(response);
      });
    })
    .put(function(req,res){
      var response = {};
      // first find out record exists or not
      // if it does then update the record
      temp.findById(req.params.id,function(err,data){
        if(err) {
          response = {"error" : true,"message" : "Error fetching data"};
        } else {
          // we got data from Mongo.
          // change it accordingly.
          if(req.body.email!== undefined) {
            // case where email needs to be updated.
            data.email = req.body.email;
          }
          if(req.body.password !== undefined) {
            // case where password needs to be updated
            data.password = req.body.password;
          }
          if(req.body.username !== undefined) {
            // case where password needs to be updated
            data.username = req.body.username;
          }
          // save the data
          data.save(function(err){
            if(err) {
              response = {"error" : true,"message" : "Error updating data"};
            } else {
              response = {"error" : false,"message" : "Data is updated for "+req.params.id};
            }
            res.json(response);
          })
        }
      });
    })
    .delete(function(req,res) {
      var response = {};
      // find the data
      temp.findById(req.params.id, function (err, data) {
        if (err) {
          response = {"error": true, "message": "Error fetching data"};
        } else {
          // data exists, remove it.
          temp.remove({_id: req.params.id}, function (err) {
            if (err) {
              response = {"error": true, "message": "Error deleting data"};
            } else {
              response = {"error": true, "message": "Data associated with " + req.params.id + "is deleted"};
            }
            res.json(response);
          });
        }


      });
    });



/********* Delete Users by ID ********************/
/***********************************************/


/* GET users listing. */
router.get('/', function(req, res, next) {

/* Totaler Inhalt (JSON) von names ...
  Personen.find(function(err, names){
    res.json(names);
*/

// Finde Person mit 'Username' = temp und gib _id  bzw. _id UND username zurück
// Person.findOne({ 'username': 'temp' }, '_id', function (err, person) {
  temp.findOne({ 'username': 'temp' }, 'username',  '_id', function (err, person) {
    if (err) return handleError(err);
    console.log('%s has the _id: %s.', person.username, person._id )// temp has the _id: 571dd0d1bc3b1eff7151e2be.
    //res.valueOf().username;
    res.json(person);
  })


});


module.exports = router;

