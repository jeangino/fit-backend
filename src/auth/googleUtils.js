const {google} = require('googleapis');

const googleConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirect: 'http://'+process.env.DOMAIN+':'+process.env.PORT+'/google-auth/success'
};

/**
 * Create the google auth object which gives us access to talk to google's apis.
 */
const createConnection = function() {
  console.log(googleConfig);
  const res = new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
  return res;
}

/**
 * This scope tells google what information we want to request.
 */
const defaultScope = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
];

/**
 * Get a url which will open the google sign-in page and request access to the scope provided (such as calendar events).
 */
const getConnectionUrl = function (auth) {
  return auth.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent', // access type and approval prompt will force a new refresh token to be made each time signs in
    scope: defaultScope
  });
}

/**
 * Create the google url to be sent to the client.
 */
exports.urlGoogle = function() {
  const auth = createConnection(); // this is from previous step
  const url = getConnectionUrl(auth);
  return url;
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

exports.getGoogleAccountFromCode = async function(code) {
  const auth = createConnection();
  const data = await auth.getToken(code);
  const tokens = data.tokens;
  auth.setCredentials(tokens);
  const service = google.people({version: 'v1', auth: auth});
  service.people.get({
       resourceName: 'people/me',
       personFields: 'emailAddresses,names'
   }, (err, response) => {
     if (err) return console.error('The API returned an error: ' + err);
      console.log(response.data.emailAddresses);
      console.log(response.data.names);
  })

  console.log(parseJwt(tokens.id_token));
  console.log(tokens);
}
