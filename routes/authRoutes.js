const express = require('express');
const {
    createUser,
    loginUserCtrl,
    getallUser,
    getaUser,
    deleteaUser,
    updatedUser,
    blockUser,
    unblockUser,
    handleRefreshToken,
    logout,
    updatePassword,
    forgotPasswordToken,
    followUser,
    unfollowUser,
    likePost,
    dislikePost,
    resetPassword,
} = require('../controller/userCtrl');
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

// const { createJob, updateJob, deleteJob } = require('../controller/jobCtrl');
// const { createCandidate,updateCandidate,getCandidate,deleteCandidate,getallCandidate } = require('../controller/candidateCtrl');
const router = express.Router();
router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.post("/follow-user/:id",authMiddleware,followUser);
router.post("/unfollow-user/:id",authMiddleware,unfollowUser);
router.post("/artworks-like/:id",likePost)
router.post("/artworks-dislike/:id",dislikePost)

router.put("/password", authMiddleware, updatePassword);
router.post("/login", loginUserCtrl);
router.get("/all-users", getallUser);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
// router.get("/artist/:id",authMiddleware,getaUser);
// router.get("/:id", getaUser)
// router.get("/artist/:id",authMiddleware,getaUser);
router.delete("/:id", deleteaUser);
router.put("/edit-user/:role/:id", authMiddleware, updatedUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);




// Recruiter
// router.post("/recruiter", createUser);
// router.get("/:id",authMiddleware,getaUser);
// router.delete("/:id",authMiddleware,deleteaUser);


// const { createJob,updateJob, deleteJob } = require('../controller/postingjobCtrl');
// // Job Routes
// router.post("/job", createJob);
// router.post("/job", createJob);
// router.put("/job-update",updateJob);
// router.delete("/job-delete",deleteJob);


// Candidate
// router.post("/candidate",createCandidate);
// router.put("/candidate-update/:id",updateCandidate);
// router.get("/candidate-get/:id",getCandidate);
// router.delete("/candidate-delete/:id",deleteCandidate);
// router.get("/",getallCandidate );






module.exports = router;