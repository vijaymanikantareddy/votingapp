const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  teamnumber: String,
  teamtitle: String,
  projectdomain: String,
  description: String,
  teamcount: String,
  tlname: String,
  tlmail: String,
  tm1name: String,
  tm1mail: String,
  tm2name: String,
  tm2mail: String,
  tm3name: String,
  tm3mail: String,
  votecount: Number,
  voters: [{ type: String }],
});

const projectModel = mongoose.model("projects", projectSchema);
module.exports = projectModel;
