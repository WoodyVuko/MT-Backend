/**
 * Created by Vuko on 19.07.16.
 */
/**
 * Created by Vuko on 13.07.16.
 */
/**
 * Created by Vuko on 01.05.16.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

// Accesspoint to Database
var dbQR = require('../models/qrSchema');

//
///************** Middleware for protection *********/
//// route middleware to verify a token
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
            message: 'No token provided. Please Log In'
        });

    }
});

router.route("/")
    .post(function(req,res){
        var response = {};
            dbQR.find({"userid" : req.body.id}, function(err,data){
                // This will run Mongo Query to fetch data based on ID.

                if(err) {
                    response = {"error" : true,"message" : "Error fetching data"};
                } else {
                    response = {"error" : false,"message" : data};
                    //console.log(data);
                }
                res.json(response);
            });
    });

/********* Add a Group  ************************/
/***********************************************/

// Notiz: Doppelte Einträge

router.route("/add")
    .get(function(req,res){
        //------------------------------------------------------
    })
    .post(function(req,res){
        var db = new dbQR;
        var response = {};

        db.tablenumber = req.body.tablenumber;
        db.url = "http://localhost:3001/m/home/" + req.body.userid + "milo" + req.body.tablenumber + "rada";
        db.userid = req.body.userid;

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


/********* CRUD find by ID *********************/
/***********************************************/

router.route("/:id")
    .post(function(req,res){
        var response = {};
        if(req.params.id.indexOf("1") > -1 || req.params.id.indexOf("2") > -1 || req.params.id.indexOf("3") > -1 || req.params.id.indexOf("4") > -1 || req.params.id.indexOf("5") > -1 || req.params.id.indexOf("6") > -1 || req.params.id.indexOf("7") > -1 || req.params.id.indexOf("8") > -1 || req.params.id.indexOf("9") > -1)  {
            dbQR.find({"userid" : req.params.id, "tablenumber" : req.body.tablenumber}, function(err,data){
                // This will run Mongo Query to fetch data based on ID.
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
        dbQR.findOne(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                // we got data from Mongo.
                // change it accordingly.
                if(req.body.tablenumber!== undefined) {
                    // case where email needs to be updated.
                    data.tablenumber = req.body.tablenumber;
                }
                if(req.body.url !== undefined) {
                    // case where password needs to be updated
                    data.url = req.body.url;
                }
                if(req.body.userid !== undefined) {
                    data.userid = req.body.userid;
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
        dbQR.findById(req.params.id, function (err, data) {
            if (err) {
                response = {"error": true, "message": "Error fetching data"};
            } else {
                // data exists, remove it.
                dbTables.remove({_id: req.params.id}, function (err) {
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


