const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
  vehicleNumber: {
    type: String,
    required: [true, 'Vehicle Number name is required'],
    trim: true,
    unique: true,
  },
  spotNumber: {
    type: Number,
    required: [true, 'Parking Spot number is required'],
    trim: true,
    unique: true,
  },
  isOccupied: {
    type: Boolean,
    default: false,
  },
  vehicleType: { 
    type: String, 
    enum: ['motorcycle', 'car', 'bus', 'truck', 'bicycle', 'scooter', 'tricycle', 'other'],
    required: [true, 'Vehicle type is required'],
  },
  floor: {
    type: Number,
    required: [true, 'Floor number is required'],
    trim: true,
  },
  entryTime: {
    type: Date,
    default: Date.now,
  },
  exitTime: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model('ParkingSlot', SlotSchema);
