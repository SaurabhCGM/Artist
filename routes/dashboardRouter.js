const express = require('express');
const { getDashboardFeed, getDashboardArtworks,getDashboardJobs } = require("../controller/dashboardCtrl");
const { isAdmin, authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", getDashboardFeed);
router.get("/artwork", getDashboardArtworks);
router.get("/job",getDashboardJobs );


module.exports = router;
