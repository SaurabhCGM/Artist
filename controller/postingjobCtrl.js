const asyncHandler = require('express-async-handler');
const Job = require('../models/postingjobModel')
const validateMongodbId = require("../utils/validateMongodbId");
const recruiterModel = require('../models/recruiterModel');
const postingjobModel = require('../models/postingjobModel');
const { default: mongoose } = require('mongoose');
// const slugify = require("slugify");

// Create Job 
const createJob = asyncHandler(async (req, res) => {
  try {
    const newJob = await Job.create(req.body);

    await recruiterModel.updateOne(
      { _id: req.body._recruiter_id },
      {
        $push: {
          _jobs: newJob.id
        }
      }
    )
    res.json(newJob);
  } catch (error) {
    throw new Error(error);
  }
});


// Update Job
const updateJob = asyncHandler(async (req, res) => {
  const id = req.params.id;
  // console.log("updateJob",req.body);
  try {
    if (req.body) {
      // req.body.slug = slugify(req.body);
    }
    const updateJob = await Job.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // console.log("updateJob",updateJob);
    res.json(updateJob);
  } catch (error) {
    throw new Error(error)
  }
});


// Delete Job
const deleteJob = asyncHandler(async (req, res) => {
  const id = req.params.id;
  //  console.log("Job",req.params.id);
  try {
    const deleteJob = await Job.findOneAndDelete(id);
    // console.log("deleteJob",deleteJob);
    res.json(deleteJob);
  }
  catch (error) {
    throw new Error(error)
  }
});

// get a single job
const getJob = asyncHandler(async (req, res) => {
  // const { id } = req.params;
  const id = req.params.id;
  // validateMongodbId(id);
  try {

    const pipeline = [
      {
        $match: {
          _id: mongoose.Types.ObjectId(id)
        }
      },
      {
        $lookup: {
          from: "recruiters",
          localField: "_recruiter_id",
          foreignField: "_id",
          as: "recruiterDetails"
        }
      }
    ]

    const getJob = await Job.aggregate(pipeline)
    res.json({
      getJob
    });
  } catch (error) {
    throw new Error(error);
  }
});

// const getJob2 = asyncHandler(async (req, res) => {
//   try {
//     const { id } = req.params
//     // console.log("my id", id);

//     const pipeline = [
//       {
//         $match: {
//           _id: mongoose.Types.ObjectId(id)
//         }
//       },
//       {
//         $unwind: "$_recruiters"
//       },
//       {
//         $lookup: {
//           from: "recruiters",
//           localField: "_postingjobs",
//           foreignField: "_id",
//           as: "all_recruiters"
//         }
//       }
//     ]

//     await postingjobModel.aggregate(pipeline).then((recruitersResponse) => {
//       // console.log("My recruiters", recruiterResponse);
//       res.json({
//         "message": "success",
//         "recruiters": recruitersResponse
//       })
//     })
    
//   } catch (error) {
//     console.log("postingjob error", error);
    
//   }
// })

// Get All Job
const getAllJob = asyncHandler(async (req, res) => {
  try {
    const job = await Job.find({});
    res.json(job);
  } catch (error) {
    console.log("job error", error);
    throw new Error(error);
  }
});


module.exports = {
  createJob,
  updateJob,
  deleteJob,
  getJob,
  getAllJob,
  // getJob2,
}