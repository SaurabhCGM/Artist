const express = require('express');
const { createMessage, getMessages } = require("../controller/messageCtrl");
const { isAdmin, authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

//Chat Route
router.post("/", createMessage);
router.get("/:chatId",getMessages);



module.exports = router;