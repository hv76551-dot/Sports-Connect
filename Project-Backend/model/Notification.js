const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
  {
    bookingid: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true }, 
    senderid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    receiverid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    type: { 
      type: String, 
      enum: ['booking', 'message', 'alert'], 
      required: true 
    }, 
    description: { type: String, default: '' }, 
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true, 
  }
);

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
