/**
 * Created by Vuko on 29.04.16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articel = new Schema({
    group: String,
    name: String,
    price: String,
    allergics: Array,
    img: String
},{collection : "userArticles"});
//},{collection : "accounts"});
//Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('userArticle', articel);
