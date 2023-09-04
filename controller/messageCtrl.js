const asyncHandler = require('express-async-handler');
const { default: mongoose } = require('mongoose');
const validateMongodbId = require("../utils/validateMongodbId");
const messageModel = require("../models/messageModel");

// Create Message
const createMessage = asyncHandler(async (req, res) => {
    const { chatId, senderId, text } = req.body;

    const message = new messageModel({
        chatId, senderId, text,
    });
    try {
        const response = await message.save();
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});


//Get Message
const getMessages = asyncHandler(async (req, res) => {
    const { chatId } = req.params;
    try {
        const messages = await messageModel.find({ chatId });
        res.status(200).json(messages);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});


module.exports = { createMessage, getMessages };