import * as express from "express";
const router = express.Router();
import { checkAccessToken } from "../utils/index.js";

import * as reportController from "../controller/reportController";

router.get("/", checkAccessToken, reportController.getBuildingReport); // 신고내역보기

module.exports = router;