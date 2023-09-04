const express = require('express');

const { getAllArtworkcat } = require('../controller/artworkcatCtrl');
const router = express.Router();


//functional area router
router.get("/", getAllArtworkcat);

module.exports = router;