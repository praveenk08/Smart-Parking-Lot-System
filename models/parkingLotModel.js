const mongoose = require('mongoose');

const ParkingLotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Parking Lot name is required'],
    unique: true,
  },
  location: {
    type: String,
    required: [true, 'Parking Lot location is required'],
  },
  totalFloors: {
    type: Number,
    required: [true, 'Total number of floors is required'],
  },
  totalSlots: {
    type: Number,
    required: [true, 'Total number of slots is required'],
  },
  availableSlots: {
    type: Number,
    required: [true, 'Available number of slots is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
});

module.exports = mongoose.model('ParkingLot', ParkingLotSchema);
