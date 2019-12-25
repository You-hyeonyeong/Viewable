const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.post("/kakao", userController.kakaoLogin);
router.get("/mypage", userController.getUserProfile);
router.get("/kakao/callback", (req, res) => {
  try {} catch (e) {
    console.log(e.message);
    next(e);
  }
});

module.exports = router;