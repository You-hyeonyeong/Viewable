const jwt = require("jsonwebtoken");
const { env } = require("./index");

function checkAndDecodeAccessToken(auth) {
  try {
    const oauth = auth.split(" ");
    const token = jwt.verify(oauth[1], env.ACCESS_KEY_SECRET);

    return token;
  } catch (e) {
    return null;
  }
}

export { checkAndDecodeAccessToken };