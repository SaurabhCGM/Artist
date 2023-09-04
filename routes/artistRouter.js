const express = require('express');
// const multer = require("multer");
const {
    createArtist,
    updateArtist,
    getArtist,
    deleteArtist,
    getallArtist,
    // liketheartwork,

    // uploadProfileImages,
} = require('../controller/artistCtrl');
const { isAdmin, authMiddleware } = require("../middleware/authMiddleware");
// const { uploadPhoto, profilepictureImgResize } = require('../middleware/uploadImages');
const router = express.Router();

// Artist Routes
router.post("/register", createArtist);
// router.put("/upload/:id", authMiddleware, uploadPhoto.array('images', 10), profilepictureImgResize,uploadProfileImages);
router.put("/:id",  updateArtist);
router.get("/:id", getArtist);
router.delete("/:id", authMiddleware, deleteArtist);
router.get("/", getallArtist);
// router.put("/likes", authMiddleware, liketheartwork,);


module.exports = router;