const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
    {
        members: Array,
    },
    {
        timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true }
    }
);

// Exports the Chat Model
module.exports = mongoose.model("Chat", chatSchema);