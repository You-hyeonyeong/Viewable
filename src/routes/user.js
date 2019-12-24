import * as express from "express";
const router = express.Router();
import userController from "../controller/userController";

router.post("/kakao", userController.kakaoLogin);
router.get("/mypage", userController.getUserProfile);

module.exports = router;  