const mongoose = require('mongoose');

let movieSchema = new mongoose.Schema ({
    title: {type: String, required: true },
    genre: {type: String, required: true },
    rating: {type: Number, required: true },
    poster: {type: String, required: true },
})

module.exports = mongoose.model ('Movie', movieSchema); 