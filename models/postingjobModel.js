const mongoose = require('mongoose');
const postingjobSchema = new mongoose.Schema(
  {
    job_title: {
      type: String
    },
    job_description: {
      type: String
    },
    job_requirements: {
      job_details: {
        experience: {
          type: String,
          enum: ["Fresher", "1-3 Years", "3-5 Years", "5-7 Years", "7-10 Years", "10+ Years"]
        },
        education: {
          type: String,
          enum: ["Doctorate", "Post-Graduation", "Graduation/Diploma", "Higher-Secondary", "School",]
        },
        offered_salary: {
          type: String,
          enum: ["1-3 LPA", "3-5 LPA", "5-7 LPA", "7-10 LPA", "10+ LPA"]
        },
      },
    },
    job_location: {
      type: String
    },
    this_remote_job: {
      type: Boolean,
      enum: ["true", "false"]
    },
    job_type: {
      type: String,
    },
    job_status: {
      type: Boolean,
      enum: ["true", "false"]
    },
    functionalarea: {
      category: {
        type: String,
      },
      sub_categories: {
        type: String,
      }
    },
    required_skills: [
      {
        type: String
      }
    ],
    post_type: {
      type: String,
      default: "job"
    },
    _recruiter_id:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'recruiters'
    },
    //   _recruiters: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'recruiters'
    // }]
  },
  {
    timestamps: true,
  },

);
module.exports = mongoose.model("PostingJob", postingjobSchema)