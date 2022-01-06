var User = require("../models/userModel");

exports.user_get = function (req, res) {
  const userDetail = {
    first_name: "etienne",
    last_name: "guilhaume",
    date_of_birth: "1985/07/22",
    email: "etienne.guilhaume@gmail.com"
  };
  var user = new User(userDetail);

  user.save(function (err) {
    if (err) console.error(err.stack)
  });

  res.json({ user });
};

exports.user_post = function (req, res) {
  const userDetail = {
    first_name: "etienne",
    last_name: "guilhaume",
    date_of_birth: "22/07/1985",
    email: "etienne.guilhaume@gmail.com"
  };
  var user = new User(userDetail);
  user.save(function (err) {
    if (err) return handleError(err);
  });
}
