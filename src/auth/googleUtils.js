const { google } = require("googleapis");
var userController = require("../controllers/usersController");

const googleConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirect:
    process.env.DOMAIN + ":" + process.env.PORT + "/google-auth/success",
};

/**
 * Create the google auth object which gives us access to talk to google's apis.
 */
const createConnection = function () {
  console.log(googleConfig);
  const res = new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
  return res;
};

/**
 * This scope tells google what information we want to request.
 */
const defaultScope = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

/**
 * Get a url which will open the google sign-in page and request access to the scope provided (such as calendar events).
 */
const getConnectionUrl = function (auth) {
  return auth.generateAuthUrl({
    access_type: "offline",
    prompt: "consent", // access type and approval prompt will force a new refresh token to be made each time signs in
    scope: defaultScope,
  });
};

/**
 * Create the google url to be sent to the client.
 */
exports.urlGoogle = function () {
  const auth = createConnection(); // this is from previous step
  const url = getConnectionUrl(auth);
  return url;
};

exports.getUserIdFromGoogleCode = async function (code, res) {
  const auth = createConnection();
  const data = await auth.getToken(code);
  const tokens = data.tokens;
  res.cookie("fitToken", data.tokens.id_token);
  auth.setCredentials(tokens);
  const service = google.people({ version: "v1", auth: auth });
  return service.people.get({
    resourceName: "people/me",
    personFields: "emailAddresses,names",
  });
};
