const express = require("express");
const router = express.Router();

router.use("/building", require("./building"));
router.use("/store", require("./store"));
router.use("/user", require("./user"));
router.use("/facility", require("./facility"));
router.use("/report", require("./report"));
router.use("/search", require("./search"));
router.use("/tourSpot", require("./tourSpot"));

module.exports = router;