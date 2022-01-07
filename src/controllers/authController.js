var googleUtils = require('../auth/googleUtils');

exports.post = function (req, res) {
  const url = googleUtils.urlGoogle();
  console.log("POST AUTH");
  console.log("URL: " + url);
  res.redirect(url);
};

exports.success = function (req, res) {
  const xxx = googleUtils.getGoogleAccountFromCode(req.query.code);
  console.log(xxx);
  res.sendStatus(200);
}

exports.get = function (req, res) {
  const url = googleUtils.urlGoogle();
  console.log("GET AUTH");
  console.log("URL: " + url);
  res.redirect(url);
}
