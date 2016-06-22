/**
 * Created by Vuko on 24.05.16.
 */

var express = require('express');
var router = express.Router();

// Accesspoint to Database
var dbAllergic  = require('../models/allergicsSchema');

//
///************** Middleware for protection *********/
//// route middleware to verify a token
//router.use(function(req, res, next) {
//
//    // check header or url parameters or post parameters for token
//    var token = req.body['x-access-token'] || req.query['x-access-token'] || req.headers['x-access-token'] || req.cookies['token'];
//
//    // decode token
//    if (token) {
//
//        // verifies secret and checks exp
//        jwt.verify(token, req.app.get('superSecret'), function(err, decoded) {
//            if (err) {
//                return res.json({ success: false, message: 'Failed to authenticate token.' });
//            } else {
//                // if everything is good, save to request for use in other routes
//                req.decoded = decoded;
//                next();
//            }
//        });
//
//    } else {
//
//        // if there is no token
//        // return an error
//        return res.status(403).send({
//            success: false,
//            message: 'No token provided. Please Log In'
//        });
//
//    }
//});

/********* Get all Articels  ********************/
/***********************************************/
router.route("/")
    .get(function(req,res){
        var response = {};
        dbAllergic.find({},function(err,data){
            //console.log(data);
            // Mongo command to fetch all data from collection.
            console.log(req.message);
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    });

/********* Add a Allergics  **********************/
/***********************************************/

router.route("/add")
    .get(function(req,res){
        //------------------------------------------------------
    })
    .post(function(req,res){
        //console.log(data);
        var db = new dbAllergic;
        var response = {};

        db.shortName = req.body.shortName;
        db.longName = req.body.longName;

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

/********* CRUD /find by ID ********************/
/***********************************************/

router.route("/:id")
    .get(function(req,res){
        var response = {};
        if(req.params.id.indexOf("1") > -1 || req.params.id.indexOf("2") > -1 || req.params.id.indexOf("3") > -1 || req.params.id.indexOf("4") > -1 || req.params.id.indexOf("5") > -1 || req.params.id.indexOf("6") > -1 || req.params.id.indexOf("7") > -1 || req.params.id.indexOf("8") > -1 || req.params.id.indexOf("9") > -1)  {
            dbAllergic.findById(req.params.id,function(err,data){
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
        }
        else{
            dbAllergic.findOne({ 'name': req.params.id }, 'name',function(err,data){
                //console.log(data);
                if(err) {
                    response = {"error" : true,"message" : "Error fetching data"};
                } else {
                    response = {"error" : false,"message" : data};
                    //console.log(data);
                }
                res.json(response);
            });
        }
    })
    .put(function(req,res){
        var response = {};
        // first find out record exists or not
        // if it does then update the record
        dbAllergic.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                // we got data from Mongo.
                // change it accordingly.
                if(req.body.shortName!== undefined) {
                    // case where email needs to be updated.
                    data.shortName = req.body.shortName;
                }
                if(req.body.longName !== undefined) {
                    data.longName = req.body.longName;
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
        dbAllergic.findById(req.params.id, function (err, data) {
            if (err) {
                response = {"error": true, "message": "Error fetching data"};
            } else {
                // data exists, remove it.
                dbAllergic.remove({_id: req.params.id}, function (err) {
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

