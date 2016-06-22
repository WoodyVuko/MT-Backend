/**
 * Created by Vuko on 29.04.16.
 */
var uniqueValidator = require('mongoose-unique-validator');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articel = new Schema({
    group: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    allergics: Array,
    img: String
},{collection : "userArticles"});
//},{collection : "accounts"});
//Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('userArticle', articel);
