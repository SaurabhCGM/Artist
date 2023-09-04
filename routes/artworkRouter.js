const express = require('express');
const { createartwork, updateArtwork, deleteArtwork, getArtwork, getArtistAllArtwork,getRecruiterAllArtwork,} = require("../controller/artworkCtrl");
const { isAdmin, authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, createartwork);
router.put("/:id", updateArtwork);
router.delete("/:id", deleteArtwork);
router.get("/:id", getArtwork);

router.get("/artist/:id", getArtistAllArtwork);
router.get("/recruiter/:id", getRecruiterAllArtwork);
// router.put("/:id/like",likeartwork)
// router.get("/dashboard", getDashboardFeed);
// router.get("/dashboard/artwork", getDashboardArtworks);






module.exports = router;