const asyncHandler = require('express-async-handler');
const Artwork = require("../models/artworkModel");
const { default: mongoose } = require('mongoose');
const validateMongodbId = require("../utils/validateMongodbId");
const artworkModel = require('../models/artworkModel');
const userModel = require('../models/userModel');
const recruiterModel = require('../models/recruiterModel');
const Job = require("../models/postingjobModel");

// Get Dashboard Feed
const getDashboardFeed = asyncHandler(async (req, res) => {
    try {
        const jobList = await Job.aggregate([
            {
                $lookup: {
                    from: "recruiters",
                    localField: "_recruiter_id",
                    foreignField: "_id",
                    as: "recruiter_details"
                }
            }
        ]);
        const artworkList = await Artwork.aggregate([
            {
                $lookup: {
                    from: "artists",
                    localField: "_created_by_artist",
                    foreignField: "_id",
                    as: "artist_details"
                }
            },
            {
                $lookup: {
                    from: "recruiters",
                    localField: "_created_by_recruiter",
                    foreignField: "_id",
                    as: "recruiter_details"
                }
            }
        ]);
        // const jobList = await Job.find({});
        // const artworkList = await Artwork.find({});

        let combinedList = jobList.concat(artworkList);

        combinedList.sort(function compare(a, b) {
            var dateA = new Date(a.createdAt);
            var dateB = new Date(b.createdAt);
            return dateB - dateA;
            // return dateA - dateB;
        });

        res.json({
            mainList: combinedList
        });
    } catch (error) {
        console.log("artwork error", error);
        throw new Error(error);
    }
});


// Get Dashboard Artist List
const getDashboardArtworks = asyncHandler(async (req, res) => {
    try {
        const artworkList = await Artwork.aggregate([
            {
                $lookup: {
                    from: "artists",
                    localField: "_created_by_artist",
                    foreignField: "_id",
                    as: "artist_details"
                }
            },
            {
                $sort: {
                    updatedAt: -1
                }
            }
        ]);

        res.json({
            artworkList
        });
    } catch (error) {
        console.log("artwork error", error);
        throw new Error(error);
    }
});

// Get Dashboard Job List
const getDashboardJobs = asyncHandler(async (req, res) => {
    try {
        const jobList = await Job.aggregate([
            {
                $lookup: {
                    from: "recruiters",
                    localField: "_recruiter_id",
                    foreignField: "_id",
                    as: "recruiter_details"
                }
            },
            {
                $sort: {
                    updatedAt: -1
                }
            }
        ]);
        res.json({
            jobList
        });
    } catch (error) {
        console.log("artwork error", error);
        throw new Error(error);
    }
});





module.exports = { getDashboardFeed, getDashboardArtworks, getDashboardJobs }