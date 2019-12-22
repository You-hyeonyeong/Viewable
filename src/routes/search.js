import * as express from "express";
const router = express.Router();

import * as storeController from "../controller/storeController";

router.get("/:categoryIdx", storeController.getStoreByCategoryIdx); // 카테고리별 검색
//router.get("/search", storeController); // 매장별 보기

module.exports = router;