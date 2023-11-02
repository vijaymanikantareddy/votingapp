const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const adminModel = mongoose.model("admins", AdminSchema);
module.exports = adminModel;
