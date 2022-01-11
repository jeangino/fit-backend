var googleUtils = require('../auth/googleUtils');
var userController = require("../controllers/usersController");

exports.post = function (req, res) {
  const url = googleUtils.urlGoogle();
  console.log("POST AUTH");
  console.log("URL: " + url);
  res.redirect(url);
};

/**
 * Handle successful login.
 * @param {*} req request
 * @param {*} res response
 */
exports.success = async function (req, res) {
  console.log("SUCCESS!!!");
  const googleData = await googleUtils.getUserFromGoogleCode(req.query.code, res);
  var userDetail = await userController.findOrCreateUser(
    googleData.data.emailAddresses[0].value,
    googleData.data.names[0].givenName,
    googleData.data.names[0].familyName
  );
  console.log("DATA FETCHED!");
  console.log("Redirecting to " + process.env.FRONT_END_DOMAIN);
  res.cookie('fitUserId', userDetail.id);
  res.redirect(process.env.FRONT_END_DOMAIN);
}

exports.get = function (req, res) {
  const url = googleUtils.urlGoogle();
  console.log("GET AUTH");
  console.log("URL: " + url);
  res.redirect(url);
}
