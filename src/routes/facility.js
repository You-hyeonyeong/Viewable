import * as express from "express";
const router = express.Router();
import * as facilityController from "../controller/facilityController.js";

router.get("/info", facilityController.getAllFacility);
//router.get("/info/:facilityIdx", facilityController.getOneFacility);

module.exports = router;