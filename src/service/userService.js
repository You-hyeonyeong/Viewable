import request from "request-promise";
import * as utils from "../utils/index.js";
import * as userDao from "../dao/userDao.js";

export const kakaoLogin = async(name, kakaoAccessToken) => {
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
    const accessToken = utils.createAccessToken(userIdx);
    console.log(accessToken);

    return { accessToken };
  } catch (e) {
    throw e;
  }
};