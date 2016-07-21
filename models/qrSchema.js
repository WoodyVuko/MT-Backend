/**
 * Created by Vuko on 24.05.16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var qr = new Schema({
    url: { type: String, required: true },
    tablenumber: { type: String, required: true },
    userid: { type: String, required: true }
},{collection : "userTablesQR"});

module.exports = mongoose.model('qr', qr);
