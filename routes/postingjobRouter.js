const express = require('express');
const { createJob, updateJob, deleteJob, getJob, getAllJob, getJob2 } = require("../controller/postingjobCtrl");
const { isAdmin, authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

// Job Routes
router.post("/", authMiddleware, createJob);
router.put("/:id", authMiddleware, updateJob);
router.delete("/:id", authMiddleware, deleteJob);
router.get("/:id", getJob);
router.get("/", getAllJob);
// router.get("/recruiter/:id", getJob2);
// router.get("/recruiters/:id",getJob2)

module.exports = router;
