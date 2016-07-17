/**
 * Created by Vuko on 13.07.16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var table = new Schema({
    tablenumber: String,
    articleid: String,
    amount: String,
    price: String,
    userid: String,
    name: String
},{collection : "tempTable"});

module.exports = mongoose.model('table', table);
