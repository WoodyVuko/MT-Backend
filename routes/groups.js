/**
 * Created by Vuko on 01.05.16.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// Accesspoint to Database
var dbGroups  = require('../models/groupsSchema');

/********* Get all Groups  **********************/
/***********************************************/

router.route("/all")
    .get(function(req,res){
        var response = {};
        dbGroups.find({},function(err,data){
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

/********* Add a Group  ************************/
/***********************************************/

// Notiz: Doppelte Einträge

router.route("/add")
    .get(function(req,res){
        //------------------------------------------------------
    })
    .post(function(req,res){
        console.log(req.body);
        var db = new dbGroups;
        var response = {};

        // fetch all from Schema
        db.name = req.body.name;
        db.desc = req.body.desc;
        db.userID = req.body.userID;
        db.shortID = req.body.shortID;
        db.img = req.body.img;

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

router.route("/findID/:id")
    .get(function(req,res){
        var response = {};
        dbGroups.findById(req.params.id,function(err,data){
            //console.log(err);
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
        dbGroups.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                // we got data from Mongo.
                // change it accordingly.
                if(req.body.name!== undefined) {
                    // case where email needs to be updated.
                    data.name = req.body.name;
                }
                if(req.body.desc !== undefined) {
                    // case where password needs to be updated
                    data.desc = req.body.desc;
                }
                if(req.body.userID !== undefined) {
                    // case where password needs to be updated
                    data.userID = req.body.userID;
                }
                if(req.body.shortID !== undefined) {
                    data.shortID = req.body.shortID;
                }
                if(req.body.img !== undefined) {
                    data.img = req.body.img;
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
        dbGroups.findById(req.params.id, function (err, data) {
            if (err) {
                response = {"error": true, "message": "Error fetching data"};
            } else {
                // data exists, remove it.
                dbGroups.remove({_id: req.params.id}, function (err) {
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



/********* CRUD /groups by name ********************/
/****************************************************/
router.route("/find/:term")
    .get(function(req,res){
        var response = {};

        dbGroups.findOne({ "name" : req.params.term }, 'name',function(err,data){
            // console.log(data);
            // This will run Mongo Query to fetch data based on email.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
                //console.log(data);
            }
            res.json(response);
        });
    });



router.route("/")
    .get(function(req,res){
        res.json({"error" : false,"message" : "Welcome to /groups/"});    });
module.exports = router;


