const Registercompany = require("../models/registercompanyModel");
const validateMongodbId = require("../utils/validateMongodbId");
const asyncHandler = require("express-async-handler");


// Create Company
const createRegistercompany = asyncHandler(async (req, res) => {
    try {
        const newRegistercompany = await Registercompany.create(req.body);
        res.json(newRegistercompany);
    } catch (error) {
        throw new Error(error);
    }
});

// Update Company
const updateRegistercompany = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const updateregistercompany = await Registercompany.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updateregistercompany);
    } catch (error) {
        throw new Error(error);
    }
});

// Delete Company
const deleteRegistercompany = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const deleteregistercompany = await Registercompany.findByIdAndDelete(id);
        res.json(deleteregistercompany);
    } catch (error) {
        throw new Error(error);
    }
});

// Get All Company
const getAllRegistercompany = asyncHandler(async (req, res) => {
    try {
        const registercompany = await Registercompany.find();
        res.json(registercompany);
    } catch (error) {
        throw new Error(error);
    }
});

// Get A single Company
const getRegistercompany = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const getRegistercompany = await Registercompany.findById(id);
        res.json({
            getRegistercompany
        });
    } catch (error) {
        throw new Error(error);
    }
});

// Exports Registercompany 
module.exports = { createRegistercompany, updateRegistercompany, deleteRegistercompany, getAllRegistercompany, getRegistercompany } 