const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema(
  {
    hostgameid: { type: mongoose.Schema.Types.ObjectId, ref: 'HostGame', required: true }, 
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    status: { 
      type: String, 
      enum: ['pending', 'confirmed', 'cancelled'], 
      default: 'pending' 
    }, 
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true, 
  }
);

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;
