const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require("crypto");

var recruiterSchema = new mongoose.Schema(
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
            default: "recruiter"
        },
        email: {
            type: String
        },
        password: {
            type: String
        },
        mobile_no: {
            type: String
        },
        profile_picture: {
            type: String,
            default: "https://plus.unsplash.com/premium_photo-1678853633562-74721c38552b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        },
        my_company: {
            type: String,
            default: null
        },
        my_job_position: {
            type: String,
            default: null
        },
        company_approval: {
            type: Boolean,
            enum: ["true", "false"]
        },
        registercompany: { type: mongoose.Schema.Types.ObjectId, ref: "Registercompany" },

        _jobs: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'jobs'
        }]
    },
    // passwordChangedAt: Date,
    // passwordResetToken: String,
    // passwordResetExpires: Date,

    {
        timestamps: true,
    }
);


// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//         next();
//     }
//     const salt = await bcrypt.genSaltSync(10);
//     this.password = await bcrypt.hash(this.password, salt)
// });
// userSchema.methods.isPasswordMatched = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };
// userSchema.methods.createPasswordResetToken = async function () {
//     const resettoken = crypto.randomBytes(32).toString("hex");
//     this.passwordResetToken = crypto.
//         createHash('sha256').
//         update(resettoken).
//         digest("hex");
//     this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
//     return resettoken;
// };

//Export the model
module.exports = mongoose.model('Recruiter', recruiterSchema);