import * as express from "express";
const router = express.Router();

router.use("/building", require("./building"));

module.exports = router;