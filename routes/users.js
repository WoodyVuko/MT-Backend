var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
// Accesspoint to Database
var dbUser  = require('../models/userSchema');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

/************** BEFORE Middleware  **************************************************************************/
/***********************************************************************************************************/
/********* Register a User  ********************/
/***********************************************/
router.route("/register")
    .get(function(req,res){
      //------------------------------------------------------
    })
    .post(function(req,res){
      //console.log(req.body);
      var db = new dbUser;
      var response = {};
      // fetch email and password from REST request.
      // Add strict validation when you use this in Production.
      db.username = req.body.username;
      db.lastname = req.body.lastname;
      db.email = req.body.email;
      db.company = req.body.company;
      db.city = req.body.city;
      db.zip = req.body.zip;
      db.street = req.body.street;
      db.streetnumber = req.body.streetnumber;
      // Password is getting crypted at the Schema
      db.password = req.body.password;
      db.firstname = req.body.firstname;
      db.save(function(err){
        // save() will run insert() command of MongoDB.
        // it will add new data in collection.
        if(err) {
          response = {"error" : true,"message" : "Error adding data", "message" : err.errors};
        } else {
          response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
      });
    });

/************** Login User  ********************/
/***********************************************/

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/authenticate', function(req, res) {

  // find the user
  dbUser.findOne({
    username: req.body.user
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, req.app.get('superSecret'), { expiresIn: "12h" });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }

    }

  });
});

/************** Middleware for protection *********/
// route middleware to verify a token
router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body['x-access-token'] || req.query['x-access-token'] || req.headers['x-access-token'] || req.cookies['token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, req.app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }
});

/************** AFTER Middleware  **************************************************************************/
/***********************************************************************************************************/
/********* Get all Users  **********************/
/***********************************************/
router.route("/")
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



/********* CRUD find by ID *********************/
/***********************************************/
router.route("/:id")
    .get(function(req,res){
      var response = {};
      //console.log(req.params.id);

      /********* Check if eMail or ID ****************/
      /***********************************************/
      if(req.params.id.indexOf("@") > -1) {
        dbUser.findOne({ "email" : req.params.id }, 'email',function(err,data){
          //console.log(data);
          // This will run Mongo Query to fetch data based on email.
          if(err) {
            response = {"error" : true,"message" : "Error fetching data"};
          } else {
            response = {"error" : false,"message" : data};
            console.log(data);
          }
          res.json(response);
        });
      }
      else
      {
        dbUser.findById(req.params.id,function(err,data) {
          if (err) {
            //console.log(err);
            response = {"error": true, "message": "Error fetching data"};
          } else {
            response = {"error": false, "message": data};
            //console.log(data);
          }
          res.json(response);
        })
      }
      })

    .put(function(req,res){
      var response = {};
      // first find out record exists or not
      // if it does then update the record
      dbUser.findById(req.params.id ,{ runValidators: true, context: 'query' }, function(err,data){
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
          if(req.body.firstname !== undefined) {
            data.firstname = req.body.firstname;
          }
          if(req.body.lastname !== undefined) {
            data.lastname = req.body.lastname;
          }
          // save the data
          data.save(function(err){
            if(err) {
              response = {"error" : true,"message" : "Error updating data", "message" : err.errors};
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

module.exports = router;


