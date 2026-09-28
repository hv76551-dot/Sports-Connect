const Helper = require('../helper/Helper')
const Venue = require('../model/Venue')

const VenueController = {}

// Register
VenueController.create = async (req, res) => {
  try {
    const { name, address,contact,image,description} = req.body

    const existingSport = await Venue.findOne({ name })
    if (existingSport) {
      return Helper.response(false, 'Venue already exists', {}, res, 400)
    }

    const newVenue = new Venue({ name, address,contact,image,description })
    await newVenue.save()

    Helper.response(true, 'Venue created successfully', {}, res, 201)
  } catch (error) {
    Helper.response(false, 'Something went wrong', error, res, 500)
  }
}

VenueController.getAllVenue = async (req, res) => {
    try {
  
      const sport = await Venue.find({});
  
      if (!sport) {
        return Helper.response(false, 'Sports not found', {}, res, 200)
      }
  
      return Helper.response(true, 'Sports found', sport, res, 200)
    } catch (error) {
      return Helper.response(false, 'Something went wrong', error, res, 500)
    }
  }


  

module.exports = VenueController
