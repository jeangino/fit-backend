//Require Mongoose
var mongoose = require("mongoose");

//Define a schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  dob: { type: Date },
  email: { type: String }
});

//Export function to create "User" model class
module.exports = mongoose.model("User", UserSchema);
