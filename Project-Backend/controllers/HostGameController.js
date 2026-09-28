const Helper = require('../helper/Helper');
const HostGame = require('../model/HostGame');

const HostGameController = {};

HostGameController.create = async (req, res) => {
  try {
    const { sportid, venueid,userid, minPlayer, maxPlayer, date, timeslot, skillLevel, note } = req.body;

    const existingGame = await HostGame.findOne({ sportid, venueid,userid, date, timeslot });
    if (existingGame) {
      return Helper.response(false, 'A game is already scheduled at this venue and time', {}, res, 400);
    }

    const newHostGame = new HostGame({ sportid, venueid,userid, minPlayer, maxPlayer, date, timeslot, skillLevel, note });
    await newHostGame.save();

    return Helper.response(true, 'Game hosted successfully', newHostGame, res, 201);
  } catch (error) {
    console.error(error);
    return Helper.response(false, 'Something went wrong', error, res, 500);
  }
};

const moment = require('moment'); // Make sure moment is installed

HostGameController.getAllGames = async (req, res) => {
  try {
    const games = await HostGame.find()
      .populate('sportid')
      .populate('venueid')
      .populate('userid');

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const filteredGames = games.filter(game => {
      const rawDate = game.date;

      let gameDate;

      // If it's a Date object or ISO string
      if (Object.prototype.toString.call(rawDate) === '[object Date]' || /^\d{4}-\d{2}-\d{2}$/.test(rawDate)) {
        gameDate = new Date(rawDate);
      }
      // If it's in DD-MM-YYYY format
      else if (/^\d{2}-\d{2}-\d{4}$/.test(rawDate)) {
        gameDate = moment(rawDate, "DD-MM-YYYY").toDate();
      } else {
        return false; // Skip if date is unrecognized
      }

      return gameDate >= today;
    });

    if (filteredGames.length === 0) {
      return Helper.response(false, 'No upcoming games found', [], res, 200);
    }

    return Helper.response(true, 'Upcoming games retrieved successfully', filteredGames, res, 200);
  } catch (error) {
    console.error(error);
    return Helper.response(false, 'Something went wrong', error, res, 500);
  }
};



HostGameController.getAllGamesByUserID = async (req, res) => {
    try {
      const userId = req.user?.id; 
  
      if (!userId) {
        return Helper.response(false, 'Unauthorized: User ID is required', {}, res, 401);
      }
  
      const games = await HostGame.find({ userid: userId })
        .populate('sportid')
        .populate('venueid')
        .populate('userid');
  
      if (!games || games.length === 0) {
        return Helper.response(false, 'No games found for this user', [], res, 200);
      }
  
      return Helper.response(true, 'Games retrieved successfully', games, res, 200);
    } catch (error) {
      console.error(error);
      return Helper.response(false, 'Something went wrong', error, res, 500);
    }
  };
  
  

HostGameController.getGameById = async (req, res) => {
  try {
    const { id } = req.params;

    const game = await HostGame.findById(id).populate('sportid').populate('venueid').populate('userid');
    if (!game) {
      return Helper.response(false, 'Game not found', {}, res, 404);
    }

    return Helper.response(true, 'Game found', game, res, 200);
  } catch (error) {
    console.error(error);
    return Helper.response(false, 'Something went wrong', error, res, 500);
  }
};

HostGameController.updateGame = async (req, res) => {
  try {
    const { id } = req.params;
    const { sportid, venueid, minPlayer, maxPlayer, date, timeslot, skillLevel, note, isActive } = req.body;

    const updatedGame = await HostGame.findByIdAndUpdate(
      id,
      { sportid, venueid, minPlayer, maxPlayer, date, timeslot, skillLevel, note, isActive },
      { new: true } 
    ).populate('sportid').populate('venueid').populate('userid');

    if (!updatedGame) {
      return Helper.response(false, 'Game not found or could not be updated', {}, res, 404);
    }

    return Helper.response(true, 'Game updated successfully', updatedGame, res, 200);
  } catch (error) {
    console.error(error);
    return Helper.response(false, 'Something went wrong', error, res, 500);
  }
};

HostGameController.deleteGame = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedGame = await HostGame.findByIdAndDelete(id);
    if (!deletedGame) {
      return Helper.response(false, 'Game not found or could not be deleted', {}, res, 404);
    }

    return Helper.response(true, 'Game deleted successfully', {}, res, 200);
  } catch (error) {
    console.error(error);
    return Helper.response(false, 'Something went wrong', error, res, 500);
  }
};

module.exports = HostGameController;
