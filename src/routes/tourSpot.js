const express = require("express");
const router = express.Router();

const tourSpotController = require("../controller/tourSpotController");

router.get("/", tourSpotController.getTourList); //추천 관광지보기
router.get("/:tourSpotIdx", tourSpotController.getOneTourList); //추천관광지 상세보기

module.exports = router;