const express = require("express");
const BookingController = require("../controllers/BookingController");
const AuthenticateUser = require("../middleware/AuthenticateUser");
var BookingRouter = express.Router();

BookingRouter.post("/create",AuthenticateUser, (req, res, next) => {
  BookingController.create(req, res, next);
});

BookingRouter.get("/getMyBookings",AuthenticateUser, (req, res, next) => {
  BookingController.getMyBookings(req, res, next);
});

BookingRouter.get("/getConfirmBookings",AuthenticateUser, (req, res, next) => {
  BookingController.getConfirmBookings(req, res, next);
});

BookingRouter.post("/remove",AuthenticateUser, (req, res, next) => {
  BookingController.remove(req, res, next);
});

BookingRouter.get("/getAll", (req, res, next) => {
  BookingController.getAll(req, res, next);
});

BookingRouter.get("/myRequestList",AuthenticateUser, (req, res, next) => {
  BookingController.requestBookingList(req, res, next);
});

BookingRouter.post("/updateOrRemove",AuthenticateUser, (req, res, next) => {
  BookingController.updateOrRemove(req, res, next);
});

module.exports = BookingRouter;
