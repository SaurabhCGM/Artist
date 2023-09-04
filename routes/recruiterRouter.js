const express = require('express');
const {
    createRecruiter,
    updateRecruiter,
    getRecruiter,
    deleteRecruiter,
    getallRecruiter,
    getRecruiterJobs,
} = require('../controller/recruiterCtrl');
const { isAdmin, authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

// Artist Routes
router.post("/register", createRecruiter);
router.put("/:id", authMiddleware, updateRecruiter);
router.get("/:id", getRecruiter);
router.delete("/:id", authMiddleware, deleteRecruiter);
router.get("/", getallRecruiter);
router.get("/jobs/:id", getRecruiterJobs);

module.exports = router;