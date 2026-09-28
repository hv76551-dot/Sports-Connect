const { json } = require("express");
const path = require("path");

const Firebase = require("../model/FirebaseToken");
const User = require("../model/User");

exports.saveToken = async function (req, res, next) {
  try {
    const firebase = new Firebase(req.body);
    const err = firebase.joiValidate(req.body);

    if (err.error) {
      return res.status(400).json({
        res: "error",
        msg: err.error.details[0].message,
      });
    }

    const user = await User.findById(req.body.user_id);

    if (!user) {
      return res.status(404).json({
        res: "error",
        msg: "User ID is not valid!",
      });
    }

    let token = await Firebase.findOne({ user_id: req.body.user_id });

    if (token) {
      token.token = req.body.token;
      token = await token.save();
      return res.status(200).json({
        res: "success",
        msg: "Token updated successfully!",
        data: token,
        user: user,
      });
    } else {
      const newToken = await firebase.save();
      return res.status(200).json({
        res: "success",
        msg: "Token saved successfully!",
        data: newToken,
      });
    }
  } catch (error) {
    console.error("Error in saveToken:", error);
    return res.status(500).json({
      res: "error",
      msg: "Something went wrong!",
    });
  }
};
