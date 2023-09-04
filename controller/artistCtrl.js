const { generateToken } = require('../config/jwtToken');
const Artist = require('../models/artistModel');
const asyncHandler = require('express-async-handler');
const validateMongodbId = require('../utils/validateMongodbId');
const { generateRefreshToken } = require('../config/refreshtoken');
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sendEmail = require('./emailCtrl');
const userModel = require('../models/userModel');

// Register Artist
const createArtist = asyncHandler(async (req, res) => {
  try {
    // const email=req.body.artist_details.email;
    const email = req.body.email;
    // console.log("email",email)
    const findArtist = await Artist.findOne({ email: email });
    // console.log("found candidate", findArtist);
    if (!findArtist) {
      // Create a new User
      const newArtist = await Artist.create(req.body);
      //  console.log("new artist : ", newArtist);
      //  res.json(newUser)
     

      await userModel.create(
        {
          email: newArtist.email,
          password: newArtist.password,
          role: newArtist.role,
          _artist: newArtist._id,
        }
      )

      res.json({
        user: newArtist,
        token: generateToken(newArtist?._id)
      });
    } else {
      res.json({
        user: "found"
      });
    }
  } catch (error) {
    // console.log("artist error", error);
  }
  
});



// Update Artist
// const updateArtist = asyncHandler(async(req,res) => {
//   // console.log("updateCandidate",req.body.title);
//   console.log("c id: ", id);
//   try {
//     const { id } = req.params;
//     if(req.body) {
//       // req.body.slug = slugify(req.body.title);
//       // const updateCandidate = await Candidate.findByIdAndUpdate( id,req.body,{
//       //   new:true,
//       // }); 
//       await Artist.updateOne(
//         { _id: id},
//         {
//           $set: 
//             req.body   
//         }
//       ).then((updateArtistResponse) => {
//         console.log("update response", updateArtistResponse);
//         res.json(updateArtistResponse)

//       })
//       // console.log("updateCandidate",updateCandidate);
//       // res.json(updateCandidate);
//     }
//   } catch (error) {
//     throw new Error(error)
//   }
// });


const updateArtist = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updateartist = await Artist.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updateartist);
  } catch (error) {
    throw new Error(error);
  }
});



// Get a Single Artist
const getArtist = asyncHandler(async (req, res) => {
  const id = req.params.id;
  // validateMongodbId(id);
  try {
    const getArtist = await Artist.findById(id);
    res.json({
      getArtist
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Delete Artist
const deleteArtist = asyncHandler(async (req, res) => {
  const id = req.params.id;
  //    console.log("Artist",req.params.id);
  try {
    const deleteArtist = await Artist.findOneAndDelete(id);
    // console.log("deleteJob",deleteJob);
    res.json(deleteArtist);
  }
  catch (error) {
    throw new Error(error)
  }
});

// const liketheartwork = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//     //  console.log("Artist",req.params.id);
//   validateMongodbId(id);
//   try {
//       const likeartwork = await Artwork.findOne(id, req.body,{
//             $push:{ likes: req.body.id} },
//       );
//       res.json(likeartwork);
//   } catch (error) {
//       throw new Error(error);
//   }
// });

// Get All Artist
const getallArtist = asyncHandler(async (req, res) => {
  try {
    const artist = await Artist.find();
    res.json(artist);
  } catch (error) {
    throw new Error(error);
  }
});


module.exports = {
  createArtist,
  updateArtist,
  getArtist,
  deleteArtist,
  getallArtist,
  // liketheartwork,
}

