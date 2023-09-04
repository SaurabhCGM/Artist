const mongoose = require('mongoose');

const registercompanySchema = new mongoose.Schema({
    company_legal_name: {
        type: String,
        default: null
    },
    industry: {
        type: String,
        default: null
    },
    company_size: {
        type: String,
    },
    company_location: {
        type: String,
    },
    company_website: {
        type: String,
    },
    recruiter_and_company_verification: {
        verify_with_your_work_email: {
            type: String,
            default: null
        },
    },
    recruiters: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'recruiter'
        }
    ]
});

//Export the registercompanymodel
module.exports = mongoose.model("Registercompany", registercompanySchema);