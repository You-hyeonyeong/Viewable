import * as request from "request";
import userDao from "../dao/userDao"

export const kakaoLogin = async kakaoAccessToken => {
  const options = {
    method: "POST",
    uri: "http://kapi.kakao.com/v2/user/me",
    json: true,
    headers: {
      Authorization: "Bearer " + kakaoAccessToken
    }
  };
  try {
    const userInfo = await request(options);
  } catch (e) {}
};

async function getUserProfile(userIdx) {
  const userProfileQuery = await userDao.selectUserProfile(userIdx)
  return userProfileQuery
}
async function getUserReport(userIdx) {
  const userReportQuery = await userDao.selectUserReport(userIdx)
  return userReportQuery
}

module.exports = {
  getUserProfile,
  getUserReport
}

