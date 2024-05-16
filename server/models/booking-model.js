const { Schema, model, Types } = require('mongoose');

const BookingSchema = new Schema({
    
    showID: { type: Types.ObjectId, ref: 'show' },
    movieID: { type: Types.ObjectId, ref: 'movie' },
    userID: { type: Types.ObjectId, ref: 'user' },
    txnID: { type: String },
    seats: [{ type: String }],         
    isPaid: { type: Boolean, default: false }

}, { timestamps: true })

module.exports = model( 'booking', BookingSchema )