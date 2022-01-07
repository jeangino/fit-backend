//Require Mongoose
var mongoose = require("mongoose");

//Define a schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  date_of_birth: { type: Date },
  email: { type: String }
});

//Export function to create "User" model class
module.exports = mongoose.model("User", UserSchema);
