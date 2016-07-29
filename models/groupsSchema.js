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
    name: { type: String, required: true },
    desc: { type: String, required: true },
    userid: { type: String, required: true },
    shortid: { type: String, required: true },
    img: { type: String, required: true },
},{collection : "userGroups"});

module.exports = mongoose.model('userGroups', groups);
