const { response } = require("../utils/response");
const userService = require("../service/userService");

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

async function getUserProfile(req, res, next) {
  const userIdx = 1; //req.user.userIdx
  try {
    const userInfo1 = await userService.getUserProfile(userIdx);
    const userInfo2 = await userService.getUserReport(userIdx);
    const userInfo = {
      userProfile: userInfo1,
      userReport: userInfo2
    };
    console.log(userInfo1, userInfo2);
    response(res, 200, "성공", userInfo);
  } catch (e) {
    next(e);
    return false;
  }
}

module.exports = {
  kakaoLogin,
  getUserProfile
};