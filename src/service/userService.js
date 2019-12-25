const request = require("request-promise");
const auth = require("../utils/auth");
const userDao = require("../dao/userDao");

const kakaoLogin = async(name, kakaoAccessToken) => {
  const options = {
    method: "GET",
    uri: "https://kapi.kakao.com/v2/user/me",
    json: true,
    headers: {
      Authorization: `Bearer ${kakaoAccessToken}`
    }
  };
  try {
    const userInfo = await request(options);
    const check = await userDao.selectUserById(userInfo.id);
    let userIdx = 0;

    if (check.length !== 1) {
      // 새로운 유저 회원 가입
      const newUser = await userDao.insertUser(
        userInfo.id,
        userInfo.kakao_account.email,
        userInfo.properties.nickname,
        userInfo.properties.profile_image
      );
      userIdx = newUser.insertId;
    } else {
      // 기존 회원 로그인
      userIdx = check[0].userIdx;
    }
    const accessToken = auth.createAccessToken(userIdx);

    return { accessToken };
  } catch (e) {
    throw e;
  }
};
async function getUserProfile(userIdx) {
  const userProfileQuery = await userDao.selectUserProfile(userIdx);
  return userProfileQuery;
}
async function getUserReport(userIdx) {
  const userReportQuery = await userDao.selectUserReport(userIdx);
  return userReportQuery;
}

module.exports = {
  kakaoLogin,
  getUserProfile,
  getUserReport
};