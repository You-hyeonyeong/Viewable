const auth = require("./auth");

function checkAccessToken(req, res, next) {
  const token = auth.checkAndDecodeAccessToken(req.headers.authorization);
  if (token) {
    req.user = token;
    next();
  } else {
    res.status(401);
    res.end();
  }
}

module.exports = { checkAccessToken };