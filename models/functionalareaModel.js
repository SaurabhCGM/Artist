const mongoose = require('mongoose');

const functionalareaSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            default: "ji"
        },
        sub_categories: {
            type: [String],
        },
    },
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Exports the functional area model
module.exports = mongoose.model("Functionalarea", functionalareaSchema);

