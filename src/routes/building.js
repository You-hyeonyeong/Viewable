import * as express from "express";
const router = express.Router();

import * as buildingController from "../controller/buildingController.js";

router.get("/", buildingController.getTest); //test getbuilding
router.get("/:buildingIdx", buildingController.OneBuilding); // 특정빌딩 정보보기
router.post("/:buildingIdx/report", buildingController.buildingReport); // 특정빌딩 정보보기

module.exports = router;