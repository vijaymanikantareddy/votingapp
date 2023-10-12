const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema({
  email: String, 
  name: String,
  rollnumber: String,
  phone: String,
  votedteam: String
});

const voterModel = mongoose.model("voters", voterSchema);
module.exports = voterModel;
