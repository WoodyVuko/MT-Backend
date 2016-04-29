var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// Accesspoint to Database
var dbUser  = require('../models/userSchema');

/********* Get all Users  **********************/
/***********************************************/

router.route("/all")
    .get(function(req,res){
      var response = {};
      dbUser.find({},function(err,data){
        //console.log(data);
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
      //console.log(data);
      var db = new dbUser;
      var response = {};
      // fetch email and password from REST request.
      // Add strict validation when you use this in Production.
      db.username = req.body.username;
      db.email = req.body.email;
      db.company = req.body.company;
      db.city = req.body.city;
      db.zip = req.body.zip;
      db.street = req.body.street;
      db.streetnumber = req.body.streetnumber;
      // Password is getting crypted at the Schema
      db.password = req.body.password;
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


/********* CRUD /Users by ID ********************/
/***********************************************/

router.route("/find/:id")
    .get(function(req,res){
      var response = {};
      dbUser.findById(req.params.id,function(err,data){
    console.log(err);
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
      dbUser.findById(req.params.id,function(err,data){
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
          if(req.body.company !== undefined) {
            data.company = req.body.company;
          }
          if(req.body.city !== undefined) {
            data.city = req.body.city;
          }
          if(req.body.zip !== undefined) {
            data.zip = req.body.zip;
          }
          if(req.body.street !== undefined) {
            data.street = req.body.street;
          }
          if(req.body.streetnumber !== undefined) {
            data.streetnumber = req.body.streetnumber;
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
      dbUser.findById(req.params.id, function (err, data) {
        if (err) {
          response = {"error": true, "message": "Error fetching data"};
        } else {
          // data exists, remove it.
          dbUser.remove({_id: req.params.id}, function (err) {
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



/********* CRUD /Users by eMail ********************/
/***********************************************/
router.route("/findEmail/:email")
    .get(function(req,res){
      var response = {};
      dbUser.findOne({ 'email': req.params.email }, 'email',function(err,data){
      console.log(data);
        // This will run Mongo Query to fetch data based on email.
        if(err) {
          response = {"error" : true,"message" : "Error fetching data"};
        } else {
          response = {"error" : false,"message" : data};
          //console.log(data);
        }
        res.json(response);
      });
    })
    .put(function(req,res){
      var response = {};
      // first find out record exists or not
      // if it does then update the record
      dbUser.findOne({ 'username': req.params.email }, 'username',function(err,data){
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
          if(req.body.company !== undefined) {
            data.company = req.body.company;
          }
          if(req.body.city !== undefined) {
            data.city = req.body.city;
          }
          if(req.body.zip !== undefined) {
            data.zip = req.body.zip;
          }
          if(req.body.street !== undefined) {
            data.street = req.body.street;
          }
          if(req.body.streetnumber !== undefined) {
            data.streetnumber = req.body.streetnumber;
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
    });



/* GET users listing. */
router.get('/', function(req, res, next) {

/* Totaler Inhalt (JSON) von names ...
  Personen.find(function(err, names){
    res.json(names);
*/

// Finde Person mit 'Username' = temp und gib _id  bzw. _id UND username zurück
// Person.findOne({ 'username': 'temp' }, '_id', function (err, person) {
  db.findOne({ 'username': 'temp' }, 'username',  '_id', function (err, person) {
    if (err) return handleError(err);
    console.log('%s has the _id: %s.', person.username, person._id )// temp has the _id: 571dd0d1bc3b1eff7151e2be.
    //res.valueOf().username;
    res.json(person);
  })


});


module.exports = router;

