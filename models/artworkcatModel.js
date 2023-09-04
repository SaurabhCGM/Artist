const mongoose = require('mongoose');

const artworkcatSchema = new mongoose.Schema(
    {
        category: {
            type: [String],
            default: "ji"
        },
    },
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Exports the functional area model
module.exports = mongoose.model("Artworkcategories", artworkcatSchema);