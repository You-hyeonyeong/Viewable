const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const buildingController = require("../controller/buildingController");
const storeController = require("../controller/storeController");

router.get("/:buildingIdx/store", storeController.getBuildingStoreList);

router.post(
  "/:buildingIdx/report",
  upload.single("img"),
  buildingController.postbuildingReport
); // 특정빌딩 신고하기
router.get("/:buildingIdx", buildingController.getOneBuilding); // 특정빌딩 정보보기
// router.get("/", buildingController.getTest); //test getbuilding

module.exports = router;