const Helper = require('../helper/Helper')
const Sport = require('../model/Sport')

const SportController = {}

// Register
SportController.create = async (req, res) => {
  try {
    const { name, image} = req.body

    const existingSport = await Sport.findOne({ name })
    if (existingSport) {
      return Helper.response(false, 'Sports already exists', {}, res, 400)
    }

    const newUser = new Sport({ name,image })
    await newUser.save()

    Helper.response(true, 'Sports created successfully', {}, res, 201)
  } catch (error) {
    Helper.response(false, 'Something went wrong', error, res, 500)
  }
}

SportController.getAllSports = async (req, res) => {
    try {
  
      const sport = await Sport.find({});
  
      if (!sport) {
        return Helper.response(false, 'Sports not found', {}, res, 200)
      }
  
      return Helper.response(true, 'Sports found', sport, res, 200)
    } catch (error) {
      return Helper.response(false, 'Something went wrong', error, res, 500)
    }
  }

module.exports = SportController
