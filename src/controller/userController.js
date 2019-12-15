import { response } from "../utils/index.js";

const kakaoLogin = async(req, res, next) => {
  try {
    console.log(req.body);
    response(res, 200, "성공");
  } catch (e) {
    next(e);
  }
};

module.exports = {
  kakaoLogin
};