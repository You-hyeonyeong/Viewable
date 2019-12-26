import * as express from "express";
const router = express.Router();
import upload from "../utils/multer";

import * as buildingController from "../controller/buildingController.js";
import * as storeController from "../controller/storeController.js";

router.get("/:buildingIdx/store", storeController.getBuildingStoreList);
router.post(
  "/:buildingIdx/report",
  upload.single("img"),
  buildingController.postbuildingReport
); // 특정빌딩 신고하기
router.get("/:buildingIdx", buildingController.getOneBuildingFacility); // 특정빌딩 편의시설 보기
router.get("/", buildingController.getBuilding); //test getbuilding

module.exports = router;