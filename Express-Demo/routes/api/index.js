const express = require("express");
const router = express.Router();

router.use("/news", require("./news"))
router.use("/upload", require("./upload"))
module.exports = router;
