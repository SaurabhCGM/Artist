const asyncHandler = require('express-async-handler');
const artworkcatModel = require('../models/artworkcatModel');


// Get All FunctionalArea
const getAllArtworkcat = asyncHandler(async (req, res) => {
  try {
    const artworkcat = await artworkcatModel.findOne();
    res.json(artworkcat);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getAllArtworkcat
}

