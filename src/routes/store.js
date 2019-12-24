import * as express from "express";
const router = express.Router();
import * as storeController from "../controller/storeController.js";

router.get("/:storeIdx", storeController.getStoreByStoreIdx);

module.exports = router;