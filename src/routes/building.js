import * as express from "express";
const router = express.Router();

import * as buildingController from "../controller/buildingController.js";

router.get("/:building/store", buildingController.getAllBuilding);
router.get("/", buildingController.getAllBuilding);

module.exports = router;