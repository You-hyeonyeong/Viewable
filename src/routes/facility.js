const express = require("express");
const router = express.Router();
const facilityController = require("../controller/facilityController");

router.get("/info", facilityController.getAllFacility);
//router.get("/info/:facilityIdx", facilityController.getOneFacility);

module.exports = router;