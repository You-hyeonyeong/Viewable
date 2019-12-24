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

function createAccessToken(userIdx) {
  try {
    const option = {
      algorithm: "HS256",
      expiresIn: "14 days",
      issuer: "viewable"
    };
    const payload = { userIdx };
    const token = jwt.sign(payload, env.SECRET_ACCESS_KEY, option);

    return `Bearer ${token}`;
  } catch (e) {
    return null;
  }
}

export { checkAndDecodeAccessToken, createAccessToken };