const express = require('express');

const{getAllFunctionalArea} = require('../controller/functionalareaCtrl');
const router = express.Router();


//functional area router
router.get("/", getAllFunctionalArea);

module.exports = router;