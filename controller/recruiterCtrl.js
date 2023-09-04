const { generateToken } = require('../config/jwtToken');
const Recruiter = require('../models/recruiterModel');
const asyncHandler = require('express-async-handler');
const validateMongodbId = require('../utils/validateMongodbId');
const { generateRefreshToken } = require('../config/refreshtoken');
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sendEmail = require('./emailCtrl');
const userModel = require('../models/userModel');
const recruiterModel = require('../models/recruiterModel');
const { default: mongoose } = require('mongoose');

// Register Recruiter
const createRecruiter = asyncHandler(async (req, res) => {
  try {
    // const email=req.body.artist_details.email;
    const email = req.body.email;
    // console.log("email",email)
    const findRecruiter = await Recruiter.findOne({ email: email });
    // console.log("found candidate", findArtist);
    if (!findRecruiter) {
      // Create a new User
      const newRecruiter = await Recruiter.create(req.body);
      console.log("new recruiter : ", newRecruiter);
      //  res.json(newUser)


      await userModel.create(
        {
          email: newRecruiter.email,
          password: newRecruiter.password,
          role: newRecruiter.role,
          _recruiter: newRecruiter.id

        }
      )

      res.json({
        user: newRecruiter,
        token: generateToken(newRecruiter?._id),
        recruiter_id: newRecruiter.id
      });
    }
  } catch (error) {
    console.log("recruiter error", error);
  }
});

// Update Recruiter 
const updateRecruiter = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updaterecruiter = await Recruiter.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updaterecruiter);
  } catch (error) {
    throw new Error(error);
  }
});



// Get a Single Recruiter
const getRecruiter = asyncHandler(async (req, res) => {
  const id = req.params.id;
  // validateMongodbId(id);
  try {

    const pipeline = [
      {
        $match: {
          _id: mongoose.Types.ObjectId(id)
        }
      },
      // {
      //   $unwind: "$_jobs"
      // },
      {
        $lookup: {
          from: "postingjobs",
          localField: "_jobs",
          foreignField: "_id",
          as: "jobDetails"
        }
      },
      {
        $sort: {
          updatedAt: -1
        }
      },
      {
        $project: {
          _jobs: 0
        }
      }
      // {
      //   $group: {
      //     _id: '$jobDetails'
      //   }
      // },
      // {
      //   $unwind: "$jobDetails"
      // },
      // {
      //   $replaceRoot: {
      //     newRoot: "$jobDetails"
      //   }
      // }
    ]

    const getRecruiter = await Recruiter.aggregate(pipeline)
    res.json({
      getRecruiter
    });
  } catch (error) {
    throw new Error(error);
  }
});


// GET SINGLE RECRUITER JOBS
const getRecruiterJobs = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params
    // console.log("my id", id);

    const pipeline = [
      {
        $match: {
          _id: mongoose.Types.ObjectId(id)
        }
      },
      {
        $unwind: "$_jobs"
      },
      {
        $lookup: {
          from: "postingjobs",
          localField: "_jobs",
          foreignField: "_id",
          as: "all_jobs"
        }
      }
    ]

    await recruiterModel.aggregate(pipeline).then((jobResponse) => {
      // console.log("My jobs", jobResponse);
      res.json({
        "message": "success",
        "jobs": jobResponse
      })
    })

  } catch (error) {
    console.log("recruiter jobs error", error);

  }
})


// Delete Recruiter
const deleteRecruiter = asyncHandler(async (req, res) => {
  const id = req.params.id;
  //    console.log("Artist",req.params.id);
  try {
    const deleteRecruiter = await Recruiter.findOneAndDelete(id);
    // console.log("deleteJob",deleteJob);
    res.json(deleteRecruiter);
  }
  catch (error) {
    throw new Error(error)
  }
});


// Get All Recruiter
const getallRecruiter = asyncHandler(async (req, res) => {
  try {
    const recruiter = await Recruiter.find();
    res.json(recruiter);
  } catch (error) {
    throw new Error(error);
  }
});

//Get All artworks
const getallArtwork = asyncHandler(async (req, res) => {

  const { id } = req.params;
  validateMongodbId(id);

  try {
      const recruiterAllArtwork = artworkModel.find(
          { created_by_recruiter: mongoose.Types.ObjectId(id) }
      )
      res.json(recruiterAllArtwork);
  } catch (error) {
      throw new Error(error);
  }
});



module.exports = {
  createRecruiter,
  updateRecruiter,
  getRecruiter,
  deleteRecruiter,
  getallRecruiter,
  getRecruiterJobs
}

