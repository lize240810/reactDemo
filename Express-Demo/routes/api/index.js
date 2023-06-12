const express = require("express");
const router = express.Router();

router.use("/news", require("./news"))
router.use("/upload", require("./upload"))
router.use("/user", require("./user"))
module.exports = router;
