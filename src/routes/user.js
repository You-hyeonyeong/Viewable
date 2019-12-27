const express = require("express");
const router = express.Router();
const { checkAccessToken } = require("../utils/middleware");
const userController = require("../controller/userController");

router.post("/kakao", userController.kakaoLogin);
router.get("/mypage", checkAccessToken, userController.getUserProfile);
router.get("/kakao/callback", (req, res) => {
  try { } catch (e) {
    console.log(e.message);
    next(e);
  }
});

module.exports = router;