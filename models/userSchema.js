/**
 * Created by Vuko on 15.04.16.
 */

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var passportLocalMongoose = require('passport-local-mongoose');


var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');
var crypto = require('crypto');
var config = require('../private/config'); // get our config file

function encrypt(text){
    var cipher = crypto.createCipher('aes-256-cbc', config.secret);
    var crypted = cipher.update(text,'utf8','hex');
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text){
    if (text === null || typeof text === 'undefined') {return text;};
    var decipher = crypto.createDecipher('aes-256-cbc', config.secret);
    var dec = decipher.update(text,'hex','utf8');
    dec += decipher.final('utf8');
    return dec;
}
var Account = new mongoose.Schema({
    username: { type: String, required: true, unique: true, uniqueCaseInsensitive: false},
    email: { type: String, required: true, unique: true, uniqueCaseInsensitive: false},
    password: {type: String, get: decrypt, set: encrypt, required: true},
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    company: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    street: { type: String, required: true },
    streetnumber: { type: String, required: true }
},{collection : "userLogins"});

Account.plugin(uniqueValidator);
Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('userLogin', Account);

