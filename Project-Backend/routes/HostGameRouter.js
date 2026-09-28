const express = require("express");
const HostGameController = require("../controllers/HostGameController");
const AuthenticateUser = require("../middleware/AuthenticateUser");

const HostGameRouter = express.Router();

HostGameRouter.post("/create", HostGameController.create);

HostGameRouter.get("/allByUserID",AuthenticateUser, HostGameController.getAllGamesByUserID);

HostGameRouter.get("/all", HostGameController.getAllGames);


HostGameRouter.get("/:id", HostGameController.getGameById);

HostGameRouter.put("/:id", HostGameController.updateGame);

HostGameRouter.delete("/:id", HostGameController.deleteGame);

module.exports = HostGameRouter;
