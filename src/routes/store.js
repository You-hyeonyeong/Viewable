const express = require("express");
const router = express.Router();
const storeController = require("../controller/storeController");

router.get("/:storeIdx", storeController.getStoreByStoreIdx);

module.exports = router;