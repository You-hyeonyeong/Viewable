import { response } from "../utils/index.js";
import userService from "../service/userService"

const kakaoLogin = async(req, res, next) => {
  try {
    console.log(req.body);
    response(res, 200, "성공");
  } catch (e) {
    next(e);
  }
};

async function getUserProfile(req, res, next) {
  const userIdx = 1 //req.user.userIdx
  try {
    const userInfo1 = await userService.getUserProfile(userIdx)
    const userInfo2 = await userService.getUserReport(userIdx)
    const userInfo = {
      userProfile : userInfo1,
      userReport : userInfo2
    }
    console.log(userInfo1, userInfo2)
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