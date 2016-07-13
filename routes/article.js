/**
 * Created by Vuko on 26.04.16.
 */

var express = require('express');
var router = express.Router();
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

// Accesspoint to Database
var dbArticle  = require('../models/articleSchema');
var dbGroups  = require('../models/groupsSchema');
var dbAllergic  = require('../models/allergicsSchema');
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

function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle)
            return true;
    }
    return false;
}

function searchForNameViaID(tempUserID)
{
    var temp = "";
    dbGroups.find({"userID": tempUserID}, function (err, data) {
        for(var i = 0; i < data.length; i++)
        {
            // if(data[i]._id == tempSearchID)
            // {
            //     //console.log("________________________________________");
            //     temp = data[i].name;
            //     console.log(temp);
            // }
            temp = data[i].name;
        }

    })
    return temp;
}


/********* Get all Articels  ********************/
/***********************************************/
router.route("/")
    .get(function(req,res) {
    })

    .post(function(req,res){
            var response = {};

        // Find Artikel via UserID
            var allValuesAllergics = [];
            var allValuesGroups = [];
            var temp = [];

            dbGroups.find(req.body.userid, function (err, data) {
                dbAllergic.find({}, function (err, data_1) {
                    dbArticle.find({}, function (err, data_2) {
                        //console.log(data_2);
                        //console.log("_____________________________________________________________________________");
                        //console.log(data);

                        // Hole ID's aus den Artikeln
                        for (var i = 0; i < data_2.length; i++) {
                            for (var n = 0; n < data_2[i].group.length; n++) {
                                var saveStatus = data_2[i].group.length;
                                // Vergleiche die ID's mit der Gruppe für den Namen
                                for (var m = 0; m < data.length; m++) {
                                    //console.log("i: ", i, " - n: ", n, " - m: ", m , " SAVE:", saveStatus);
                                    if (data[m]._id == data_2[i].group[n].id ) {
                                        temp.push(data[m].name);
                                        //console.log(data[m].name);
                                    }
                                    //console.log(temp);
                                }
                            }
                            // Werte übertragen und 'temp' leeren
                            //console.log("Temp: ", temp);
                            allValuesGroups.push(temp);
                            temp = [];
                        }

                        //console.log(allValuesGroups);
                        //console.log(data_2);
                        for (var i = 0; i < data_2.length; i++) {
                            for (var n = 0; n < data_2[i].allergics.length; n++) {
                                var saveStatus = data_2[i].allergics.length;
                                //console.log("Data_2", data_2[i].allergics[n].id, " I:", i);
                                //console.log(data_1);
                                for (var m = 0; m < data_1.length; m++) {
                                    //console.log("i: ", i, " - n: ", n, " - m: ", m , " SAVE:", saveStatus);
                                    //console.log("Data_1", data_1[m]._id , " I: ", m);
                                    if (data_1[m]._id == data_2[i].allergics[n].id ) {
                                        temp.push(data_1[m].shortName);
                                        //console.log(data_1[m].shortName);
                                    }

                                }
                            }
                            //console.log("Temp: ", temp);
                            allValuesAllergics.push(temp);
                            temp = [];
                        }

                        // ID's in der Response mit den umgewandelten Arrays ersetzen
                        for (var i = 0; i < data_2.length; i++) {

                            data_2[i].allergics = allValuesAllergics[i];
                            data_2[i].group = allValuesGroups[i];

                        }

                        if (err) {
                            response = {"error": true, "message": "Error fetching data"};
                        } else {
                            response = {
                                "error": false,
                                "message": data_2
                            };
                        }
                        res.json(response);
                    })
                })
            })
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
        //console.log(req.body);

        console.log(req.body);
        //dbGroups.find({ "shortID" : req.body.group }, function(err,data){
            console.log("Artikel soll hinzugefügt werden!");
            //console.log(data);
            //db.group = data[0].name;
            db.group = req.body.group;
            db.name = req.body.name;
            db.price = req.body.price;
            db.allergics = req.body.allergics;
            db.img = req.body.img;
            db.usrID = req.body.userid;
            db.desc = req.body.desc;

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
        //});

    });

/********* CRUD /find by ID ********************/
/***********************************************/

router.route("/:id")
    .get(function(req,res) {
        var response = {};
        if (req.params.id.indexOf("1") > -1 || req.params.id.indexOf("2") > -1 || req.params.id.indexOf("3") > -1 || req.params.id.indexOf("4") > -1 || req.params.id.indexOf("5") > -1 || req.params.id.indexOf("6") > -1 || req.params.id.indexOf("7") > -1 || req.params.id.indexOf("8") > -1 || req.params.id.indexOf("9") > -1) {
                dbArticle.findById(req.params.id, function (err, data) {
                    dbAllergic.find({}, function (err_2, data_2) {
                        dbGroups.find({}, function (err_3, data_3) {

                            var foundAllergics = [];
                            // Suche ID von Allergics in der DB und fülle den Namen nach
                            for (var n = 0; n < data.allergics.length; n++) {
                                for (var i = 0; i < data_2.length; i++) {
                                    if (data.allergics[n].id == data_2[i]._id) {
                                        foundAllergics.push(data_2[i]);
                                    }
                                }
                            }

                            var foundGroups = [];
                            // Suche ID von Groups in der DB und fülle den Namen nach
                            for (var n = 0; n < data.group.length; n++) {
                                for (var i = 0; i < data_3.length; i++) {
                                    if (data.group[n].id == data_3[i]._id) {
                                        foundGroups.push(data_3[i]);
                                    }
                                }
                            }
                            data.group = foundGroups;
                            data.allergics = foundAllergics;

                            //console.log(data);



                            // This will run Mongo Query to fetch data based on ID.
                            if (err) {
                                response = {"error": true, "message": "Error fetching data"};
                            } else {
                                response = {"error": false, "message": data};
                                //console.log(data);
                            }
                            res.json(response);
                        });
                    })
                })
        }
        else {
            dbArticle.findOne({'name': req.params.id}, 'name', function (err, data) {
                //console.log(data);
                if (err) {
                    response = {"error": true, "message": "Error fetching data"};
                } else {
                    response = {"error": false, "message": data};
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
                if(req.body.desc !== undefined) {
                    data.desc = req.body.desc;
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
                if(req.body.userid !== undefined) {
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

