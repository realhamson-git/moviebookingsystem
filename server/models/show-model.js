const { Schema, model, Types } = require('mongoose');

const ShowSchema = new Schema({
    
    name: String,
    timing: {
        start: String,
        end: String,
    },         
    
    movieID: { type: Types.ObjectId, ref: 'movie' },
    
}, { timestamps: true })

module.exports = model( 'show', ShowSchema )