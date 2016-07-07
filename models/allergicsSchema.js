/**
 * Created by Vuko on 24.05.16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var allergic = new Schema({
    shortName: { type: String, required: true },
    longName: { type: String, required: true },
    userid: { type: String, required: true }
},{collection : "userAllergic"});

module.exports = mongoose.model('allergic', allergic);
