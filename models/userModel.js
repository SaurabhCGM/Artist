// Erase if already required
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require("crypto");

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
    {
        email: {
            type: String
        },
        password: {
            type: String
        },
        role: {
            type: String,
            enum: ["artist", "recruiter"]
        },
        _artist: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "artist",
        },
        _recruiter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "recruiter",
        },
        // follow: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "user",
        // },
        // unfollow: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "user",
        // },
        followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

        likes: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "artworks"
        }
    ],
    dislikes: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "artworks"
    }
],
        // artist: {
        //     first_name: {
        //         type: String,
        //         default: null
        //     },
        //     last_name: {
        //         type: String,
        //         default: null
        //     },
        //     mobile: {
        //         type: Number,
        //         default: null
        //     },
        //     profile_picture: {
        //         type: String,
        //         default: "https://plus.unsplash.com/premium_photo-1678853633562-74721c38552b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        //     },
        //     gender: {
        //         type: String,
        //         enum: ["Male", "Female"],
        //     },
        //     i_am: {
        //         type: String,
        //         enum: ["Experienced", "Fresher"],
        //     },
        //     date_of_birth: {
        //         type: Date,
        //         default: null
        //     },
        //     artist_bio: {
        //         type: String,
        //         default: null
        //     },
        //     highest_education: {
        //         institute_name: {
        //             type: String,
        //             default: null
        //         },
        //         education_level_and_degree: {
        //             type: String,
        //             enum: ["Doctorate", "Post-Graduation", "Graduation/Diploma", "Higher-Secondary", "School"],
        //         },
        //         education_period:{
        //             start: {
        //                 type: Date
        //             },
        //             end: {
        //                 type: Date
        //             }
        //         }
        //     },
        //     job_preference: {
        //         job_type: {
        //             type: String,
        //             enum: ["Full-Time", "Part-Time", "Contract", "Freelance", "Temporary", "Remote"],
        //         },
        //         functional_area: {
        //             type: String,
        //             default: null
        //         },
        //         preferred_city: {
        //             type: String,
        //             default: null
        //         },
        //         expected_salary: {
        //             type: Number,
        //             default: null
        //         },
        //     },

        //     work_experience: {
        //         company_name: {
        //             type: String,
        //             default: null
        //         },
        //         industry: {
        //             type: String,
        //             default: null
        //         },
        //         start_end_time: {
        //             start: {
        //                 type: Date
        //             },
        //             end: {
        //                 type: Date
        //             }
        //         },
        //         functional_area: {
        //             type: String,
        //             default: null
        //         },
        //         my_designation: {
        //             type: String,
        //             default: null
        //         },
        //         department: {
        //             type: String,
        //             default: null
        //         },
        //         this_internship: {
        //             type: Boolean,
        //             default: false,
        //         }
        //     },
        //     artist_portfolio_link: {
        //         portfolio_link: {
        //             type: String,
        //             default: null
        //         }
        //     },
        //     Upload_resume: {
        //         upload_phone: {
        //             type: String,
        //             default: null
        //         },
        //     },
        //     postingjob: { type: mongoose.Schema.Types.ObjectId, ref: "PostingJob" },
        // },
        // recruiter: {
        //     first_name: {
        //         type: String,
        //         default: null
        //     },
        //     last_name: {
        //         type: String,
        //         default: null
        //     },
        //     profile_picture: {
        //         type: String,
        //         default: "https://plus.unsplash.com/premium_photo-1678853633562-74721c38552b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        //     },
        //     my_company: {
        //         type: String,
        //         default: null
        //     },
        //     my_job_position: {
        //         type: String,
        //         default: null
        //     },
        //     company_approval: {
        //         type: Boolean,
        //         enum: ["true", "false"]
        //     },
        //     registercompany: { type: mongoose.Schema.Types.ObjectId, ref: "Registercompany" },
        // },
        // passwordChangedAt: Date,
        // passwordResetToken: String,
        // passwordResetExpires: Date,
    },
    {
        timestamps: true,
    }
);


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt)
});
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.createPasswordResetToken = async function () {
    const resettoken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.
        createHash('sha256').
        update(resettoken).
        digest("hex");
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
    return resettoken;
};

//Export the model
module.exports = mongoose.model('User', userSchema);