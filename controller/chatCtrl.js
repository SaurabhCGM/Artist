const asyncHandler = require('express-async-handler');
const { default: mongoose } = require('mongoose');
const validateMongodbId = require("../utils/validateMongodbId");
const chatModel = require("../models/chatModel");

// Create Chat
const createChat = asyncHandler(async (req, res) => {
    const { firstId, secondId } = req.body

    try {
        const chat = await chatModel.findOne({
            members: { $all: [firstId, secondId] },
        })
        if (chat) return res.status(200).json(chat);

        const newChat = new chatModel({
            members: [firstId, secondId],
        })

        const response = await newChat.save();

        res.status(200).json(response);
    } catch (error) {
        // throw new Error(error);
        console.log(error);
        res.status(500).json(error);
    }
});


//Get User Chats
const findUserChats = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    try {
        const chats = await chatModel.find({
            members: { $in: [userId] },
        });
        res.status(200).json(chats);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});


// Find Chat
const findChat = asyncHandler(async (req, res) => {
    const { firstId, secondId } = req.params;

    try {
        const chat = await chatModel.find({
            members: { $all: [firstId, secondId] },
        });
        res.status(200).json(chat);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

module.exports = { createChat, findUserChats, findChat };