/**
 * Created by Vuko on 29.04.16.
 */
var uniqueValidator = require('mongoose-unique-validator');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var article = new Schema({
    group: Array,
    name: { type: String, required: true },
    price: { type: String, required: true },
    usrID: { type: String, required: true },
    allergics: Array,
    img: String,
    desc : {type: String, required: true}
},{collection : "userArticles"});
//},{collection : "accounts"});
//Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('userArticle', article);
