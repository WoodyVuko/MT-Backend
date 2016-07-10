/**
 * Created by Vuko on 01.05.16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
Warengruppen (Sortierung der Artikel)
    - Vorspeise
    - Hauptgericht etc.
Hauptgruppen (Oberbegriff)
    - Speisen
    - Getränke
    - Diverses
 */
var groups = new Schema({
    name: String,
    desc: String,
    userid: String,
    shortid: String,
    img: String
},{collection : "userGroups"});

module.exports = mongoose.model('userGroups', groups);
