import * as express from "express";
const router = express.Router();

import * as reportController from "../controller/reportController";

router.get("/", reportController.getBuildingReport); // 신고내역보기

module.exports = router;