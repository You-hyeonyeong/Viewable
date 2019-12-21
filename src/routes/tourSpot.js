import * as express from "express";
const router = express.Router();

import * as tourSpotController from "../controller/tourSpotController";

router.get("/", tourSpotController.getTourList); //추천 관광지보기
router.get("/:tourSpotIdx", tourSpotController.getOneTourList); //추천관광지 상세보기

module.exports = router;