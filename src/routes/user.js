import * as express from "express";
const router = express.Router();
import userController from "../controller/userController";

router.post("/kakao", userController.kakaoLogin);
router.get("/kakao/callback", (req, res) => {
  try {} catch (e) {
    console.log(e.message);
    next(e);
  }
});

module.exports = router;