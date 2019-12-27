const express = require("express");
const router = express.Router();
const { checkAccessToken } = require("../utils/middleware");

const reportController = require("../controller/reportController");

router.get("/", checkAccessToken, reportController.getBuildingReport); // 신고내역보기

module.exports = router;