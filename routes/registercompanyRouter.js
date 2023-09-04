const express = require('express');
const { createRegistercompany, updateRegistercompany, deleteRegistercompany, getAllRegistercompany, getRegistercompany } = require("../controller/registercompanyCtrl");
const { isAdmin, authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", createRegistercompany);
router.put("/:id", updateRegistercompany);
router.delete("/:id", deleteRegistercompany);
router.get("/", getAllRegistercompany);
router.get("/:id", getRegistercompany);

module.exports = router;