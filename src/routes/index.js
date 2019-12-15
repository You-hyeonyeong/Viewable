import * as express from "express";
const router = express.Router();

router.use("/building", require("./building"));
router.use("/user", require("./user"));

module.exports = router;