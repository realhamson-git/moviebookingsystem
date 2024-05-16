const { Schema, model } = require('mongoose');

const MovieSchema = new Schema({
    
    title: { 
        type: String,
        require: true, 
    },
    
    year: String,
    extract: String,
    thumbnail: String,
    
    cast: [{ type: String }],
    genres: [{ type: String }],
    
}, { timestamps: true })

module.exports = model( 'movie', MovieSchema )