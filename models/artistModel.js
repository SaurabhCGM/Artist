// const mongoose = require('mongoose');
// const crypto = require('crypto');
// const slugify = require('slugify');
// const bcrypt = require('bcrypt');

// const candidateSchema = new mongoose.Schema(
//     {
//         candidate_details: {
//             profile_picture: {
//                 type: String,
//                 default: "https://plus.unsplash.com/premium_photo-1678853633562-74721c38552b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
//             },
//             gender: {
//                 type: String,
//                 enum: ["Male", "Female"],
//             },
//             i_am: {
//                 type: String,
//                 enum: ["Experienced", "Fresher"],
//             },
//             firstName: {
//                 type: String,
//             },
//             lastName: {
//                 type: String,   
//             },
//             email: {
//                 type: String,
//             },
//             date_of_birth: {
//                 type: Date,
//             },
//             password: {
//                 type: String,  
//             },
//             role: {
//                 type: String,  
//                 enum: ["artist", "recruiter"],
//             },

//         },
// candidate_bio:{
//     bio: {
//         type: String,
//     },
// },

//         highest_education: {
//             institute_name: {
//                 type: String,

//             },
//             education_level_and_degree: {
//                 type: String,
//                 enum: ["Doctorate", "Post-Graduation", "Graduation/Diploma", "Higher-Secondary", "School"],
//             },
//             education_period: {
//                 start: {
//                     type: Date
//                 },
//                 end: {
//                     type: Date
//                 }
//             }
//         },

//         job_preference: {
//             job_type: {
//                 type: String,
//                 enum: ["Full-Time", "Part-Time", "Contract", "Freelance", "Temporary","Remote"],
//             },
//             functional_area: {
//                 type: String,

//             },
//             preferred_city: {
//                 type: String,

//             },
//             expected_salary: {
//                 type: String,
//             },
//         },

//         work_experience:{
//             company_name: {
//                 type: String,
//             },
//             industry: {
//                 type: String
//             },
//             start_end_time:{
//                 start: {
//                     type: Date
//                 },
//                 end: {
//                     type: Date
//                 }
//             },
//             functional_area:{
//                 type: String,
//             },
//             my_designation:{
//                 type: String,
//             },
//             department:{
//                 type: String,
//             },
//             this_internship:{
//                 type: Boolean,
//                 default:false,
//             }
//         },
//         candidate_portfolio_link:{
//             portfolio_link:{
//                 type: String,
//             }
//         },
//         Upload_resume:{
//             upload_phone:{
//                 type: String,
//             },
//         },
//     },

//     { timestamps: true }
// );

// candidateSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//         next();
//     }
//     const salt = await bcrypt.genSaltSync(10);
//     this.password = await bcrypt.hash(this.password, salt)
// });
// candidateSchema.methods.isPasswordMatched = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };
// candidateSchema.methods.createPasswordResetToken = async function () {
//     const resettoken = crypto.randomBytes(32).toString("hex");
//     this.passwordResetToken = crypto.
//         createHash('sha256').
//         update(resettoken).
//         digest("hex");
//     this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
//     return resettoken;
// };

// //Export the CandidateModel
// module.exports = mongoose.model('Candidate', candidateSchema);

// Erase if already required
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require("crypto");

var artistSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            default: null
        },
        last_name: {
            type: String,
            default: null
        },
        role: {
            type: String,
            default: "artist"
        },
        mobile: {
            type: Number,
            default: null
        },
        email: {
            type: String
        },
        password: {
            type: String
        },
        profile_picture: {
            type: String,
            default: "https://plus.unsplash.com/premium_photo-1678853633562-74721c38552b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        },
        // images:[],
        gender: {
            type: String,
            enum: ["Male", "Female"],
        },
        i_am: {
            type: String,
            enum: ["Experienced", "Fresher"],
        },
        date_of_birth: {
            type: Date,
            default: null
        },
        artist_bio: {
            type: String,
            default: null
        },
        highest_education: {
            institute_name: {
                type: String,
                default: null
            },
            education_level_and_degree: {
                type: String,
                enum: ["Doctorate", "Post-Graduation", "Graduation/Diploma", "Higher-Secondary", "School"],
            },
            education_period: {
                start: {
                    type: Date
                },
                end: {
                    type: Date
                }
            }
        },
        job_preference: {
            job_type: {
                type: String,
                enum: ["Full-Time", "Part-Time", "Contract", "Freelance", "Temporary", "Remote"],
            },
            functional_area: {
                type: String,
                default: null
            },
            preferred_city: {
                type: String,
                default: null
            },
            expected_salary: {
                type: String,
                default: null
            },
        },

        work_experience: {
            company_name: {
                type: String,
                default: null
            },
            industry: {
                type: String,
                default: null
            },
            start_end_time: {
                start: {
                    type: Date,
                    default: null
                },
                end: {
                    type: Date,
                    default: null
                }
            },
            functional_area: {
                type: String,
                default: null
            },
            my_designation: {
                type: String,
                default: null
            },
            department: {
                type: String,
                default: null
            },
            this_internship: {
                type: Boolean,
                default: false,
            }
        },
        artist_portfolio_link: {
            portfolio_link: {
                type: String,
                default: null
            }
        },
        Upload_resume: {
            upload_phone: {
                type: String,
                default: null
            },
        },
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "artwork"
        }],
        dislikes: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        comment: {
            type: String,
            required: true,
        },
        postingjob: { type: mongoose.Schema.Types.ObjectId, ref: "PostingJob" },

        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
    },
    {
        timestamps: true,
    }
);


// artistSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//         next();
//     }
//     const salt = await bcrypt.genSaltSync(10);
//     this.password = await bcrypt.hash(this.password, salt)
// });
// artistSchema.methods.isPasswordMatched = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };
// artistSchema.methods.createPasswordResetToken = async function () {
//     const resettoken = crypto.randomBytes(32).toString("hex");
//     this.passwordResetToken = crypto.
//         createHash('sha256').
//         update(resettoken).
//         digest("hex");
//     this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
//     return resettoken;
// };

//Export the model
module.exports = mongoose.model('Artist', artistSchema);