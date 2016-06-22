/**
 * Created by Vuko on 26.04.16.
 */

var express = require('express');
var router = express.Router();

// Accesspoint to Database
var dbArticle  = require('../models/articleSchema');

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
        dbArticle.find({},function(err,data){
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

/********* Add a Article  **********************/
/***********************************************/

router.route("/add")
    .get(function(req,res){
        //------------------------------------------------------
    })
    .post(function(req,res){
        //console.log(data);
        var db = new dbArticle;
        var response = {};
        console.log(req.body);

        db.name = req.body.name;
        db.price = req.body.price;
        db.allergics = req.body.allergics;
        db.img = req.body.img;
        db.group = req.body.group;
        db.usrID = req.body.userid;
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
            dbArticle.findById(req.params.id,function(err,data){
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
            dbArticle.findOne({ 'name': req.params.id }, 'name',function(err,data){
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
        dbArticle.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                // we got data from Mongo.
                // change it accordingly.
                if(req.body.name!== undefined) {
                    // case where email needs to be updated.
                    data.name = req.body.name;
                }
                if(req.body.price !== undefined) {
                    data.price = req.body.price;
                }
                if(req.body.group !== undefined) {
                    data.group = req.body.group;
                }
                if(req.body.allergics !== undefined) {
                    data.allergics = req.body.allergics;
                }
                if(req.body.img !== undefined) {
                    data.img = req.body.img;
                }
                if(req.body.userid !== undefinded) {
                    data.usrID = req.body.userid;

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
        dbArticle.findById(req.params.id, function (err, data) {
            if (err) {
                response = {"error": true, "message": "Error fetching data"};
            } else {
                // data exists, remove it.
                dbArticle.remove({_id: req.params.id}, function (err) {
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

