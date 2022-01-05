var User = require("../models/userModel");

exports.user_get = function (req, res) {
  const userDetail = {
    first_name: "etienne",
    last_name: "guilhaume",
    date_of_birth: "22/07/1985",
    email: "etienne.guilhaume@gmail.com"
  };
  var user = new User(userDetail);
  res.json({ user });
};

exports.user_post = function (req, res) {
  res.json("not implemented");
};
