import * as request from "request";

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