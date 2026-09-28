const mongoose = require('mongoose')

const SportSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, default: "" }
  },
  {
    timestamps: true
  }
)

const Sport = mongoose.model('Sport', SportSchema)

module.exports = Sport
