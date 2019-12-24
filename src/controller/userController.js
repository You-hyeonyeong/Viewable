import { response } from "../utils/index.js";
import * as userService from "../service/userService.js";

const kakaoLogin = async(req, res, next) => {
  try {
    const newUser = await userService.kakaoLogin(
      req.body.name,
      req.body.kakaoAccessToken
    );
    response(res, 200, newUser);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
};

module.exports = {
  kakaoLogin
};