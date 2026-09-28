const Helper = require("../helper/Helper");
const Booking = require("../model/BookingSchema");
const HostGame = require("../model/HostGame");
const Notification = require("../model/Notification");
const BookingController = {};

// BookingController.create = async (req, res) => {
//   try {
//     const { hostgameid } = req.body;
//     const userid = req.user?.id;

//     if (!userid) {
//       return Helper.response(
//         false,
//         "Unauthorized: User ID is required",
//         {},
//         res,
//         200
//       );
//     }

//     const existing = await Booking.findOne({ hostgameid, userid });
//     if (existing) {
//       return Helper.response(false, "Booking already exists", {}, res, 200);
//     }

//     const newBooking = new Booking({ hostgameid, userid });
//     await newBooking.save();

//     const hostGame = await HostGame.findById(hostgameid);
//     if (!hostGame) {
//       return Helper.response(false, "Host game not found", {}, res, 200);
//     }

//     const hostId = hostGame.userid;

//     const newNotification = new Notification({
//       bookingid: newBooking._id,
//       senderid: userid,
//       receiverid: hostId,
//       type: "booking",
//       description: `User ${userid} has booked a spot in your game.`,
//       isActive: true,
//     });

//     await newNotification.save();

//     return Helper.response(
//       true,
//       "Booking created successfully, notification sent",
//       newBooking,
//       res,
//       201
//     );
//   } catch (error) {
//     console.error(error);
//     return Helper.response(false, "Something went wrong", error, res, 500);
//   }
// };

BookingController.create = async (req, res) => {
  try {
    const { hostgameid } = req.body;
    const userid = req.user?.id;

    if (!userid) {
      return Helper.response(
        false,
        "Unauthorized: User ID is required",
        {},
        res,
        200
      );
    }

    const existing = await Booking.findOne({ hostgameid, userid });
    if (existing) {
      return Helper.response(false, "Booking already exists", {}, res, 200);
    }

    const hostGame = await HostGame.findById(hostgameid);
    if (!hostGame) {
      return Helper.response(false, "Host game not found", {}, res, 200);
    }

    const bookingCount = await Booking.countDocuments({ hostgameid });

    if (bookingCount >= hostGame.maxPlayer) {
      return Helper.response(
        false,
        "Booking limit reached. No more spots available.",
        {},
        res,
        200
      );
    }

    const newBooking = new Booking({ hostgameid, userid });
    await newBooking.save();

    hostGame.joindplayer = bookingCount + 1;
    await hostGame.save();

    const newNotification = new Notification({
      bookingid: newBooking._id,
      senderid: userid,
      receiverid: hostGame.userid,
      type: "booking",
      description: `User ${userid} has booked a spot in your game.`,
      isActive: true,
    });

    await newNotification.save();

    return Helper.response(
      true,
      "Booking created successfully, notification sent",
      newBooking,
      res,
      201
    );
  } catch (error) {
    console.error(error);
    return Helper.response(false, "Something went wrong", error, res, 500);
  }
};


BookingController.getMyBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    const bookings = await Booking.find({ userid: userId })
      .populate("userid")
      .populate({
        path: "hostgameid",
        populate: [{ path: "sportid" }, { path: "venueid" }],
      });

    if (!bookings || bookings.length === 0) {
      return Helper.response(
        false,
        "No bookings found for this user",
        {},
        res,
        200
      );
    }

    return Helper.response(true, "Bookings found", bookings, res, 200);
  } catch (error) {
    return Helper.response(false, "Something went wrong", error, res, 500);
  }
};

BookingController.getConfirmBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    const bookings = await Booking.find({ userid: userId ,status: "confirmed"})
      .populate("userid")
      .populate({
        path: "hostgameid",
        populate: [{ path: "sportid" }, { path: "venueid" }],
      });

    if (!bookings || bookings.length === 0) {
      return Helper.response(
        false,
        "No bookings found for this user",
        {},
        res,
        200
      );
    }

    return Helper.response(true, "Bookings found", bookings, res, 200);
  } catch (error) {
    return Helper.response(false, "Something went wrong", error, res, 500);
  }
};



BookingController.getAll = async (req, res) => {
  try {
    const sport = await Booking.find({})
      .populate("sportid")
      .populate("venueid")
      .populate("userid")
      .populate("hostgameid");

    if (!sport) {
      return Helper.response(false, "Booking not found", {}, res, 200);
    }

    return Helper.response(true, "Booking found", sport, res, 200);
  } catch (error) {
    return Helper.response(false, "Something went wrong", error, res, 500);
  }
};

BookingController.remove = async (req, res) => {
  try {
    const { bookingid } = req.body;
    const userid = req.user?.id;

    if (!userid) {
      return Helper.response(
        false,
        "Unauthorized: User ID is required",
        {},
        res,
        200
      );
    }

    const booking = await Booking.findOne({ _id: bookingid, userid });
    if (!booking) {
      return Helper.response(false, "Booking not found", {}, res, 200);
    }

    await Booking.deleteOne({ _id: bookingid });

    return Helper.response(true, "Booking removed successfully", {}, res, 200);
  } catch (error) {
    console.error(error);
    return Helper.response(false, "Something went wrong", error, res, 500);
  }
};

BookingController.requestBookingList = async (req, res) => {
  try {
    const userid = req.user?.id;

    if (!userid) {
      return Helper.response(
        false,
        "Unauthorized: User ID is required",
        {},
        res,
        401
      );
    }

    const requestList = await Booking.find({})
      .populate({
        path: "hostgameid",
        match: { userid },
        populate: [{ path: "sportid" }, { path: "venueid" }],
      })
      .populate("userid");

    const filteredList = requestList.filter((item) => item.hostgameid !== null);

    if (!filteredList.length) {
      return Helper.response(false, "No matching requests found", [], res, 200);
    }

    return Helper.response(
      true,
      "Request list retrieved successfully",
      filteredList,
      res,
      200
    );
  } catch (error) {
    console.error("Error fetching request list:", error);
    return Helper.response(
      false,
      "Failed to retrieve request list",
      error,
      res,
      500
    );
  }
};

BookingController.updateOrRemove = async (req, res) => {
  try {
    const { bookingid, action } = req.body;
    const userid = req.user?.id;

    if (!userid) {
      return Helper.response(
        false,
        "Unauthorized: User ID is required",
        {},
        res,
        401
      );
    }

    const booking = await Booking.findOne({ _id: bookingid });
    if (!booking) {
      return Helper.response(false, "Booking not found", {}, res, 404);
    }

    if (action === "confirm") {
      booking.status = "confirmed";
      await booking.save();
      return Helper.response(
        true,
        "Booking confirmed successfully",
        booking,
        res,
        200
      );
    } else if (action === "cancel") {
      await Booking.deleteOne({ _id: bookingid });
      return Helper.response(
        true,
        "Booking removed successfully",
        {},
        res,
        200
      );
    }

    return Helper.response(false, "Invalid action", {}, res, 400);
  } catch (error) {
    console.error("Error updating/removing booking:", error);
    return Helper.response(false, "Something went wrong", error, res, 500);
  }
};

module.exports = BookingController;
