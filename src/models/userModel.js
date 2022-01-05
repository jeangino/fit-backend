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

UserSchema.virtual("name").get(function () {
  var fullname = "";
  if (this.first_name && this.last_name) {
    fullname = this.last_name + ", " + this.first_name;
  }
  if (!this.first_name || !this.last_name) {
    fullname = "";
  }
  return fullname;
});

//Export function to create "User" model class
module.exports = mongoose.model("User", UserSchema);
