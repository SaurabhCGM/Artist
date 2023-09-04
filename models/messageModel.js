const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chatId: String,
    senderId: String,
    text: String,
},
    {
        timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true }
    }
);

// Exports the Message Model
module.exports = mongoose.model("Message", messageSchema);