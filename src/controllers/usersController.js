var User = require("../models/userModel");
var mongoose = require("mongoose");

/// retrieve a user
exports.user_get = async function (req, res) {
  const id = req.params.userId;
  var isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    res.sendStatus(404);
  } else {
    const userDetail = await User.findOne({ _id: req.params.userId })
      .select(["-__v", "-_id"])
      .exec();
    if (userDetail === null) {
      res.sendStatus(404);
    } else {
      res.json(userDetail);
    }
  }
};

/**
 * Finds a user with email. Will create the user if the email is not in the db.
 * @param {*} email find by
 * @param {*} firstName first name, to be peristed
 * @param {*} lastName last name, to be persisted
 * @returns 
 */
exports.findOrCreateUser = function (email, firstName, lastName) {
  const options = { upsert: true, new: true };
  return User.findOneAndUpdate(
    { email: email },
    { email: email, firstName: firstName, lastName: lastName },
    options
  );
};

/// Creates a new user
exports.user_create = async function (req, res, next) {
  const options = { upsert: true, new: true };
  var userDetail = await User.findOneAndUpdate(
    { email: req.body.email },
    req.body,
    options
  ).exec();

  res.set("id", userDetail.id);
  res.sendStatus(200);
};
