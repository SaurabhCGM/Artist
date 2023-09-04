const asyncHandler = require('express-async-handler');
const functionalareaModel = require('../models/functionalareaModel');


// Get All FunctionalArea
const getAllFunctionalArea = asyncHandler(async (req, res) => {
  try {
    const functional_area = await functionalareaModel.find();
    res.json(functional_area);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
    getAllFunctionalArea
}

