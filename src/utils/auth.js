const jwt = require("jsonwebtoken");
const env = require("./env");

function checkAndDecodeAccessToken(auth) {
  try {
    const oauth = auth.split(" ");
    const token = jwt.verify(oauth[1], env.SECRET_ACCESS_KEY);

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

    console.log(token);
console.log("0;=00000000");

    return `Bearer ${token}`;
  } catch (e) {
    return null;
  }
}

module.exports = { checkAndDecodeAccessToken, createAccessToken };