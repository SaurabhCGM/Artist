const asyncHandler = require('express-async-handler');
const Artwork = require("../models/artworkModel");
const { default: mongoose } = require('mongoose');
const validateMongodbId = require("../utils/validateMongodbId");
const artworkModel = require('../models/artworkModel');
const userModel = require('../models/userModel');
const recruiterModel = require('../models/recruiterModel');
const artistModel = require('../models/artistModel');
const Job = require("../models/postingjobModel");

// Create Artwork
const createartwork = asyncHandler(async (req, res) => {
    try {
        const newArtwork = await Artwork.create(req.body);
        res.json(newArtwork);
    } catch (error) {
        throw new Error(error);
    }
});

// Update Artwork
const updateArtwork = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const updateartwork = await Artwork.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updateartwork);
    } catch (error) {
        throw new Error(error);
    }
});

// Delete Artwork
const deleteArtwork = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const deleteartwork = await Artwork.deleteOne({
            _id: mongoose.Types.ObjectId(id)
        });

        res.json({ deleteartwork });
    } catch (error) {
        throw new Error(error);
    }
});

// Get a Artwork
// const getArtwork = asyncHandler(async (req, res) => {
//     // const { id } = req.params;
//     const id = req.params.id;
//     // validateMongodbId(id);
//     try {

//       const pipeline = [
//         {
//           $match: {
//             _id: mongoose.Types.ObjectId(id)
//           }
//         },
//         {
//           $lookup: {
//             from: "artworks",
//             localField: "_recruiter_id",
//             foreignField: "_id",
//             as: "recruiterDetails"
//           }
//         }
//       ]

//       const getJob = await Job.aggregate(pipeline)
//       res.json({
//         getJob
//       });
//     } catch (error) {
//       throw new Error(error);
//     }
//   });

// get a single Artwork
const getArtwork = asyncHandler(async (req, res) => {

    let sendResponse = {
        _id: null,
        media_content: [],
        title: null,
        createdAt: null,
        updatedAt: null,
        user_details: {
            id: null,
            first_name: null,
            last_name: null,
            profile_picture: null
        }
    };

    const { id } = req.params;
    validateMongodbId(id);

    // let pipeline1 = [
    //     {
    //         $match: {
    //             _id: mongoose.Types.ObjectId(id)
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: 'users',
    //             localField: 'created_by.user_id',
    //             foreignField: "_id",
    //             as: "userDetails"
    //         }
    //     },
    //     {
    //         $project: {
    //             title: 1,
    //             media_content: 1,
    //             id: 1,
    //             createdAt: 1,
    //             updatedAt: 1,
    //             'userDetails.role': 1,
    //             'userDetails._artist': 1,
    //             'userDetails._recruiter': 1,
    //         }
    //     }
    // ];

    try {
        await artworkModel.findOne(
            { _id: mongoose.Types.ObjectId(id) }
        ).then(async (artworkResponse) => {
            console.log("artworks", artworkResponse);
            if (artworkResponse._created_by_artist) {
                await artistModel.findOne({ _id: mongoose.Types.ObjectId(artworkResponse._created_by_artist)}).then( (artistResponse) => {
                    console.log("artworks of artist", artistResponse);
                    sendResponse.user_details.first_name = artistResponse.first_name,
                        sendResponse.user_details.last_name = artistResponse.last_name,
                        sendResponse.user_details.profile_picture = artistResponse.profile_picture
                })
            } else {
                await recruiterModel.findOne(
                    { _id:  mongoose.Types.ObjectId(artworkResponse._created_by_recruiter) }
                ).then((recruiterResponse) => {
                    sendResponse.user_details.first_name = recruiterResponse.first_name,
                        sendResponse.user_details.last_name = recruiterResponse.last_name,
                        sendResponse.user_details.profile_picture = recruiterResponse.profile_picture
                })
            }
        })
        res.json({
                    sendResponse
                });

        // await artworkModel.aggregate(pipeline1).then(async (artworkResponse) => {
        //     console.log("artwork",artworkResponse);
        //     sendResponse._id = artworkResponse[0]._id,
        //         sendResponse.title = artworkResponse[0].title,
        //         sendResponse.media_content = artworkResponse[0].media_content,
        //         sendResponse.createdAt = artworkResponse[0].createdAt,
        //         sendResponse.updatedAt = artworkResponse[0].updatedAt;

        //     if (artworkResponse[0].userDetails.role === 'artist') {
        //         await artworkModel.findOne({
        //             _id: mongoose.Types.ObjectId(artworkResponse[0].userDetails[0]._artist)
        //         }).then((artistArtworkResponse) => {
        //             sendResponse.user_details.id = artistArtworkResponse._id,
        //                 sendResponse.user_details.first_name = artistArtworkResponse.first_name,
        //                 sendResponse.user_details.last_name = artistArtworkResponse.last_name,
        //                 sendResponse.user_details.profile_picture = artistArtworkResponse.profile_picture
        //         })
        //     } else {
        //         await recruiterModel.findOne({
        //             _id: mongoose.Types.ObjectId(artworkResponse[0].userDetails[0]._recruiter)
        //         }).then((recruiterArtworkResponse) => {
        //             sendResponse.user_details.id = recruiterArtworkResponse._id,
        //                 sendResponse.user_details.first_name = recruiterArtworkResponse.first_name,
        //                 sendResponse.user_details.last_name = recruiterArtworkResponse.last_name,
        //                 sendResponse.user_details.profile_picture = recruiterArtworkResponse.profile_picture
        //         })
        //     }
        //     res.json({
        //         sendResponse
        //     });
        // })

    } catch (error) {
        throw new Error(error);
    }
});


//Get All artist artworks
const getArtistAllArtwork = asyncHandler(async (req, res) => {

    const { id } = req.params;
    validateMongodbId(id);

    console.log("my artist id", id);

    try {
        const artistAllArtwork = artworkModel.find(
            { _created_by_artist: mongoose.Types.ObjectId(id) }
        ).then((response) => {
            console.log("artworks of artist", response);
            res.json({ response });
        })

        console.log("my artworks", artistAllArtwork);
    } catch (error) {
        throw new Error(error);
    }
});

//Get All recruiter artworks
const getRecruiterAllArtwork = asyncHandler(async (req, res) => {

    const { id } = req.params;
    validateMongodbId(id);

    console.log("my recruiter id", id);

    try {
        const recruiterAllArtwork = artworkModel.find(
            { _created_by_recruiter: mongoose.Types.ObjectId(id) }
        ).then((response) => {
            console.log("artworks of recruiter", response);
            res.json({ response });
        })

        console.log("my artworks", recruiterAllArtwork);
    } catch (error) {
        throw new Error(error);
    }
});



// // Get DASHBOARD All LIST
// const getDashboardFeed = asyncHandler(async (req, res) => {
//     try {
//         const jobList = await Job.aggregate([
//             {
//                 $lookup: {
//                     from: "recruiters",
//                     localField: "_recruiter_id",
//                     foreignField: "_id",
//                     as: "recruiter_details"
//                 }
//             }
//         ]);
//         const artworkList = await Artwork.aggregate([
//             {
//                 $lookup: {
//                     from: "artists",
//                     localField: "_created_by_artist",
//                     foreignField: "_id",
//                     as: "artist_details"
//                 }
//             }
//         ]);
//         // const jobList = await Job.find({});
//         // const artworkList = await Artwork.find({});

//         let combinedList = jobList.concat(artworkList);

//         combinedList.sort(function compare(a, b) {
//             var dateA = new Date(a.createdAt);
//             var dateB = new Date(b.createdAt);
//             // return dateB - dateA;
//             return dateA - dateB;
//         });

//         res.json({
//             mainList: combinedList
//         });
//     } catch (error) {
//         console.log("artwork error", error);
//         throw new Error(error);
//     }
// });


// // Get Dashboard Artist List
// const getDashboardArtworks = asyncHandler(async (req, res) => {
//     try {
//         const artworkList = await Artwork.aggregate([
//             {
//                 $lookup: {
//                     from: "artists",
//                     localField: "_created_by_artist",
//                     foreignField: "_id",
//                     as: "artist_details"
//                 }
//             }
//         ]);

//         res.json({
//             artworkList
//         });
//     } catch (error) {
//         console.log("artwork error", error);
//         throw new Error(error);
//     }
// });

// Comments on Artwork
// const comment = asyncHandler (async(req,res) => {
//     const { id } = req.params;
//     const {artworkid} = req.body;
//     console.log("User id", id);
//     try {
//         const comment = await User.findByIdAndUpdate(id);
//         console.log("comment", req.body.comment)
//     } catch (error) {
//         throw new Error(error);
//     }
// })

// Comments on artwork
const comment= asyncHandler(async (req, res) => {
})

module.exports = { createartwork, updateArtwork, deleteArtwork, getArtwork, getArtistAllArtwork, getRecruiterAllArtwork, }