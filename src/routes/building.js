const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const { checkAccessToken } = require("../utils/middleware");

const buildingController = require("../controller/buildingController");
const storeController = require("../controller/storeController");

router.get("/:buildingIdx/store", storeController.getBuildingStoreList);
router.post(
  "/:buildingIdx/report",
  upload.single('img'),
  checkAccessToken, buildingController.postbuildingReport
); // 특정빌딩 신고하기
router.get("/:buildingIdx", buildingController.getOneBuildingFacility); // 특정빌딩 편의시설 보기
router.get("/", buildingController.getBuilding); //test getbuilding
 
module.exports = router;