/**
 * Created by Vuko on 15.04.16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');
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
var Account = new Schema({
    username: String,
    email: String,
    password: {type: String, get: decrypt, set: encrypt},
    firstname: String,
    lastname: String,
    company: String,
    city: String,
    zip: String,
    street: String,
    streetnumber: String
},{collection : "userLogins"});
//},{collection : "accounts"});
//Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('userLogin', Account);
