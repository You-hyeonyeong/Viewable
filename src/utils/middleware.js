import * as util from "./index.js";

function checkAccessToken(req, res, next) {
  const token = util.checkAndDecodeAccessToken(req.headers.authorization);

  if (token) {
    req.user = token;
    next();
  } else {
    res.status(401);
    res.end();
  }
}

export { checkAccessToken };