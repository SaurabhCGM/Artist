const express = require('express');
const { createChat, findUserChats, findChat } = require("../controller/chatCtrl");
const { isAdmin, authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

//Chat Route
router.post("/", createChat);
router.get("/:userId", findUserChats);
router.get("/find/:firstId/:secondId",findChat);


module.exports = router;