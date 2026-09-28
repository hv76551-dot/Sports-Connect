const express = require("express");
const VenueController = require("../controllers/VenueController");
var VenueRouter = express.Router();

VenueRouter.post("/create", (req, res, next) => {
  VenueController.create(req, res, next);
});

VenueRouter.get("/getAll", (req, res, next) => {
  VenueController.getAllVenue(req, res, next);
});

module.exports = VenueRouter;
