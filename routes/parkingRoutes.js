const express = require("express");
const router = express.Router();

const parkingController = require("../controllers/parkingController");
router.post("/entry", parkingController.addParkingLot);
router.get("/parkingLots", parkingController.getParkingLots);
router.post("/parking-entry", parkingController.vehicleEntry);
router.post("/parking-exit/", parkingController.vehicleExit);

module.exports = router;