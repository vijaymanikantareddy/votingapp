const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    teamnumber: Number,
    teamtitle: String,
    tlname: String, 
    tlmail: String,
    tm1name: String,
    tm1mail: String,
    tm2name: String,
    tm2mail: String,
    tm3name: String,
    tm3mail: String,
})

const teamModel = mongoose.model("users", UserSchema);
module.exports = teamModel;