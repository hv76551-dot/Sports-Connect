const mongoose = require('mongoose');

const HostGameSchema = new mongoose.Schema(
  {
    sportid: { type: mongoose.Schema.Types.ObjectId, ref: 'Sport', required: true }, 
    venueid: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: true }, 
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    minPlayer: { type: Number, required: true, default: 1 },
    maxPlayer: { type: Number, required: true, default: 1 },
    joindplayer:{type: Number, default: 0},
    date: { type: String, required: true },
    timeslot: { type: String, required: true },
    skillLevel: { type: String, required: true },
    note: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true, 
  }
);

const HostGame = mongoose.model('HostGame', HostGameSchema);

module.exports = HostGame;
