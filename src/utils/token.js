// const Promise = require("bluebird");
require("dotenv").config();
const credentials = {
  client: {
    id: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET
  },
  auth: {
    tokenHost: "https://eu.battle.net"
  }
};

const oauth2 = require("simple-oauth2").create(credentials);
let token = null;

const getToken = () => {
  if (token === null || token.expired()) {
    return oauth2.clientCredentials
      .getToken()
      .then(oauth2.accessToken.create)
      .then(t => {
        token = t;
        return t.token.access_token;
      })
      .catch(e => console.log(e));
  } else {
    return Promise.resolve(token.token.access_token);
  }
};

module.exports = getToken;
