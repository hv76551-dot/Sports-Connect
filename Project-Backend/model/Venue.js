const mongoose = require('mongoose')

const VenueSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: false },
    image: { type: String, default: null },
    description: { type: String, required: true },
  },
  {
    timestamps: true
  }
)

const Venue = mongoose.model('Venue', VenueSchema)

module.exports = Venue
