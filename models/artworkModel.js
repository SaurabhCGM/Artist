const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema(
    {
        media_content: [
            {
                media_type: String,

                media_image: String,

                media_video: String,

                media_link: String,

            },
        ],
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        artworkcategories: {
            category: {
                type: String,
            },
        },

        _created_by_artist: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'artists'
        },
        _created_by_recruiter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'recruiters'
        },
        post_type: {
            type: String,
            default: "artwork"
        },
        comments: [
            // {
            //     type: String,
            //     type: mongoose.Schema.Types.ObjectId,
            //     ref: 'users'
            // },
            // first_name: {
            //     type: String,
            // }
            {
                User:{
                    type: String,
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
                },
                first_name:{
                    type: String,
                },
                
            }
        ],
    },

    {
        timestamps: true,
    },
);

//Export the artworkmodel
module.exports = mongoose.model('Artwork', artworkSchema);