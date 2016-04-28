/**
 * Created by Vuko on 26.04.16.
 */

var express = require('express');
var router = express.Router();
var xyz = ''

// Article
router.get('/', function(req, res, next) {
    res.json({"error" : false,"message" : "Hello Asshole"});
});

module.exports = router;

