const { generateToken } = require('../config/jwtToken');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const validateMongodbId = require('../utils/validateMongodbId');
const { generateRefreshToken } = require('../config/refreshtoken');
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sendEmail = require('./emailCtrl');
const userModel = require('../models/userModel');

// Register User
const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        // Create a new User
        const newUser = await User.create(req.body);
        //  res.json(newUser)
        res.json({
            user: newUser,
            token: generateToken(newUser?._id)
        });
    }
    else {
        // User Already Exists
        throw new Error("User Already Exists");
    }
});


// Login User
// const loginUserCtrl=asyncHandler(async(req,res) => {
//     const {email,password}= req.body;
//     console.log("email,password",req.body)
//      // check if user exists or not
//      const findUser = await User.findOne({'user_auth_details.email': email});
//      console.log("found User",findUser);
//      if(findUser && (findUser.user_auth_details.password == password)) {
//         console.log("if block")
//                 const refreshToken = await generateRefreshToken(findUser?._id);
//                 const updateuser = await User.findByIdAndUpdate(
//                     findUser.id,
//                     {
//                     refreshToken: refreshToken,
//                     role: 1
//                 },
//                 { new: true }
//                 );
//                 res.cookie("refreshToken",refreshToken,{
//                     httpOnly:true,
//                     maxAge: 72 * 60 * 60 * 1000,
//                 }); 
//                  res.json({
//                     user: findUser,
//                     token:generateToken(findUser?._id),
//                  });
//              }else {
//                 throw new Error("Invalid Credentials");
//              }
//  });
const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check if user exists or not
    const findUser = await User.findOne({ email: email });
    if (findUser && await findUser.isPasswordMatched(password)) {
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateuser = await User.findByIdAndUpdate(
            findUser.id,
            {
                refreshToken: refreshToken,
            },
            { new: true }
        );
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        res.json({
            // _id: findUser?._id,
            // firstname:findUser?.firstname,
            // lastname:findUser?.lastname,
            email: findUser?.email,
            // password: findUser?.password,
            role: findUser?.role,
            // mobile:findUser?.mobile,
            artistId: findUser._artist,
            recruiterId: findUser._recruiter,
            token: generateToken(findUser?._id),
        });
    } else {
        throw new Error("Invalid Credentials");
    }
});

// handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No refresh token in cookies");
    const refreshToken = cookie.refreshToken;
    console.log(refreshToken)
    const user = await User.findOne({ refreshToken });
    if (!user) throw new Error(" No refresh token present indb or not matched");
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err || user.id !== decoded.id) {
            throw new Error("There is something wrong with refresh token");
        }
        const accessToken = generateToken(user?._id)
        res.json({ accessToken })
    });
});


// logout functionality
const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookie;
    if (!cookie?.refreshToken) throw new Error("No refresh token in cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        return res.sendStatus(204);
    }
    await User.findOneAndUpdate(refreshToken, {
        refreshToken: "",
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    });
    res.sendStatus(204);
});


// Update a User


// const updatedUser = asyncHandler(async (req,res) => {
//     console.log(req.body);
//     console.log("hi");

//     const {id} = req.params;
//     validateMongodbId(id);
//     try {
//         const updatedUser = await User.findByIdAndUpdate(id,{
//             ...req.body
//         }, {
//             new: true,
//         }
//         );
//         res.json(updatedUser);
//     } catch (error) {
//         throw new Error(error);
//     }
// });

// const updatedUser = asyncHandler(async (req,res) => {
//     console.log(req.body);
//     // console.log("hi");

//     const {id} = req.params;
//     console.log("id",req.params)
//     validateMongodbId(id);
//     try {
//         const updatedUser = await User.findByIdAndUpdate(id,{
//             // firstName:req?.body?.firstName,
//             // lastName:req?.body?.lastName,
//             // email:req?.body?.email,
//             // mobile:req?.body?.mobile,
//         }, {
//             new: true,
//         }
//         );
//         res.json(updatedUser);
//     } catch (error) {
//         throw new Error(error);
//     }
// });

const updatedUser = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.params;
        const data = req.body;
        // const updateData = {
        //     role: ""
        // };
        console.log("my role", role);
        console.log("my data", data);
        let mykeys = Object.keys(data);
        console.log("my keys", mykeys);
        let myvalues = Object.values(data);
        console.log("next keys", myvalues);

        let updateObj = {};
        for (let i = 0; i < mykeys?.length; i++) {
            updateObj.role.mykeys[i] = myvalues[i];
        }
        console.log("my object", updateObj);

        if (req.body) {
            console.log("update data", req.body);
            await userModel.updateOne(
                { _id: id },
                {
                    $set: {
                        'artist.first_name': myvalues[0]
                    }
                }
            )
            // await User.updateOne(
            //     { _id: id },
            //     {

            //     }
            // ).then((updateUserResponse) => {
            //     console.log("update response", updateUserResponse);
            //     res.json(updateUserResponse)
            // })
        }
    } catch (error) {
        throw new Error(error)
    }
});
// const updatedUser = asyncHandler(async(req,res) => {
//     const { id } = req.params;
//     validateMongodbId(id);
//     try {
//         const updateuser = await User.findByIdAndUpdate(id, req.body, { new : true });
//         res.json(updateuser);
//     } catch (error) {
//         throw new Error(error);
//     }
// });




// Get all users
const getallUser = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find();
        res.json(getUsers);
    } catch (error) {
        throw new Error(error)
    }
});

// Get a single user
const getaUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const getaUser = await User.findById(id);
        res.json({
            getaUser
        })
    } catch (error) {
        throw new Error(error);
    }
});

// Get a delete user
const deleteaUser = asyncHandler(async (req, res) => {
    console.log(req.params)
    const { id } = req.params;
    try {
        const deleteaUser = await User.findByIdAndDelete(id);
        res.json({
            deleteaUser,
        })
    } catch (error) {
        throw new Error(error);
    }
});

// Block User
const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const block = await User.findByIdAndUpdate(
            id,
            {
                isBlocked: true
            },
            {
                new: true,
            }
        );
        res.json({
            message: "User Blocked"
        });
    } catch (error) {
        throw new Error(error)
    }
});


// Unblock User
const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const unblock = await User.findByIdAndUpdate(
            id,
            {
                isBlocked: false
            },
            {
                new: true,
            }
        );
        res.json({
            message: "User unBlocked"
        });
    } catch (error) {
        throw new Error(error)
    }
});


// change Password
const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;
    validateMongodbId(_id);
    const user = await User.findById(_id);
    if (password) {
        user.password = password;
        const updatedPassword = await user.save();
        res.json(updatedPassword)
    }
    else {
        res.json(user);
    }
});

// forget-password (Email)
const forgotPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found with this email");
    try {
        const token = await user.createPasswordResetToken();
        await user.save();
        const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:6000/api/user/reset-password/${token}'>Click Here</>`;
        const data = {
            to: email,
            text: "Hey User",
            subject: "Forgot Password Link",
            htm: resetURL,
        };
        sendEmail(data);
        res.json(token);
    } catch (error) {
        throw new Error(error);
    }
});


// Reset-password (Email)
const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const hashedToken = crypto.createHash('sha256').update(token).digest("hex");
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) throw new Error("Token Expired,Please try again later");
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user);
});


// Follow a user
const followUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log("User id", id);
    try {
        const getauser = await User.findById(id);
        console.log("user", getauser)

        console.log("id", req.params)
        const currentUser = await User.findById(req.body.followers);
        console.log("current user id", req.body.followers)
        console.log("current", currentUser)

        if (!getauser || !currentUser) {
            console.log("if blocked call first");
            return res.status(404).json({ message: 'User not found.' });
        }

        if (!currentUser.followers.includes(id)) {
            console.log("getauser", id);
            currentUser.followers.push(id);
            getauser.following.push(req.body.followers);

            await currentUser.save();
            await getauser.save();

            res.json({ message: 'User followed successfully.' });
        } else {
            res.json({ message: 'You are already following this user.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred.' });
    }
});


// Unfollow a user
const unfollowUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log("User id", id);
    try {
        const getauser = await User.findById(id);
        console.log("user", getauser)

        console.log("id", req.params)
        const currentUser = await User.findById(req.body.followers);
        console.log("current user id", req.body.followers)
        console.log("current", currentUser)

        if (!getauser || !currentUser) {
            console.log("if blocked call first");
            return res.status(404).json({ message: 'User not found.' });
        }

        if (!currentUser.following.includes(id)) {
            console.log("getauser", id);
            currentUser.following.pull(id);
            getauser.followers.pull(req.body.following);

            await currentUser.save();
            await getauser.save();

            res.json({ message: 'User Unfollowed Sucessfully' });
        } else {
            res.json({ message: 'You are not following this user' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred.' });
    }
});


// Like Post
const likePost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { artworkid } = req.body;
    console.log("User id", id);
    try {
        // const ArtwotkId = req.params.post_id;
        const post = await User.findById(id);
        console.log("post", req.body.likes)
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        } else {
            await User.updateOne(
                { _id: id },
                {
                    $push: {
                        likes: artworkid
                    }
                }
            ).then((response) => {
                return res.status(200).json({ message: 'Artwork Liked' });

            })
        }
        // post.likes++;

        await post.save();

        res.json({ message: 'Post liked successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }

})

// Dislike Post
const dislikePost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { artworkid } = req.body;
    console.log("User id", id);
    try {
        // const ArtwotkId = req.params.post_id;
        const post = await User.findById(id);
        console.log("post", req.body.dislikes)
        if (!post ) {
          return res.status(404).json({ error: 'Post not found' });
        } else {
            await User.updateOne(
                {_id: id},
                {
                    $pull: {
                        dislikes: artworkid
                    }
                }
            ).then((response) => {
          return res.status(200).json({ message: 'Artwork Disliked' });

            })
        }
        // post.likes++;

        await post.save();
    
        res.json({ message: 'Post disliked successfully' });
      } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
      }
      
    })


module.exports = {
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
    resetPassword,
    followUser,
    unfollowUser,
    likePost,
    dislikePost,
};    