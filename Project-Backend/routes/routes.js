const express = require("express");
const Helper = require("../helper/Helper");
var router = express.Router();

const AuthRouter = require("./AuthRouter");
const SportRouter = require("./SportRouter");
const VenueRouter = require("./VenueRouter");
const HostGameRouter = require("./HostGameRouter");
const BookingRouter = require("./BookingRouter");


router.use("/", AuthRouter);
router.use("/sports", SportRouter);
router.use("/venue",VenueRouter)
router.use("/hostgame",HostGameRouter)
router.use("/booking",BookingRouter)


router.use("*", (req, res, next) => {
    Helper.response(false, "API REQUEST NOT FOUND!!", {}, res, 404);
});

module.exports = router;


