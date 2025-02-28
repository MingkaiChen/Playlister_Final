const mongoose = require('mongoose')
const Schema = mongoose.Schema
/*
    This is where we specify the format of the data we're going to put into
    the database.
    
    @author McKilla Gorilla
*/
const playlistSchema = new Schema(
    {
        name: { type: String, required: true },
        ownerEmail: { type: String, required: true },
        ownerName: { type: String, required: true },
        songs: { type: [{
            title: String,
            artist: String,
            youTubeId: String
        }], required: true },
        published: { type: Boolean, required: true },
        publishedDate: { type: Date, required: false },
        likes: { type: Number, required: false },
        dislikes: { type: Number, required: false },
        comments: { type: [{
            ownerName: String,
            comment: String
        }], required: false }
    },
    { timestamps: true },
)

module.exports = mongoose.model('Playlist', playlistSchema)
