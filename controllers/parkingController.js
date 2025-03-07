const ParkingLot = require('../models/parkingLotModel');

const ParkingSlot = require('../models/parkingSlotModel');

const handleErrorResponse = (res, status, message) => res.status(status).json({ message });

const addParkingLot = async (req, res) => {
  try {
    const { name, location, totalFloors, totalSlots } = req.body;

    if (!name || !location || !totalFloors || !totalSlots) {
      return handleErrorResponse(res, 400, 'All fields are required!');
    }

    const parkingLot = await ParkingLot.create({
      name,
      location,
      totalFloors,
      totalSlots,
      availableSlots: totalSlots,
    });

    return handleErrorResponse(res, 201, { message: "Parking lot added successfully!", parkingLot });
  } catch (error) {
    return handleErrorResponse(res, 500, { message: "Error adding parking lot", error: error.message });
  }
};


const getParkingLots = async (req, res) => {
  try {
    const parkingLots = await ParkingLot.find();
    return handleErrorResponse(res, 200, { message: "Parking lots", result: parkingLots });
  } catch (error) {
    return handleErrorResponse(res, 500, { message: "Error fetching parking lots", error: error.message });
  }
}

const vehicleEntry = async (req, res) => {
  try {
    const { vehicleNumber, vehicleType ,spotNumber} = req.body;
    
    if (!vehicleNumber || !vehicleType || !spotNumber) {
      return handleErrorResponse(res, 400, 'All fields are required!');
    }
      const parkingLotName ='Delhi Airport Parking';
      const occupiedSlots = await ParkingLot.findOne({name: parkingLotName },"availableSlots");

      if (!occupiedSlots) {
          return res.status(404).json({ error: "Parking lot not found" });
      }

     const parking= await ParkingSlot.create({
      vehicleNumber : vehicleNumber,
      spotNumber: spotNumber,
      isOccupied: true,
      vehicleType,
      floor: 1,
      entryTime:new Date(),
    
    });

    const updatedParkingLot = await ParkingLot.findOneAndUpdate(
      { name: parkingLotName }, 
      { $inc: { availableSlots: -1 } }, 
      { new: true, runValidators: true }
    );

    console.log(updatedParkingLot);
    return res.status(201).json({ message: "Slot assigned"});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  
};


const vehicleExit = async (req, res) => {
  try {
    const { vehicleNumber } = req.body;
    if (!vehicleNumber) {
      return handleErrorResponse(res, 400, 'Vehicle number is required!');
    }

    const parkingLotName ='Delhi Airport Parking';
    const parking = await ParkingSlot.findOne({vehicleNumber: vehicleNumber, isOccupied: true});

    if (!parking) {
      return res.status(404).json({ message: "Vehicle not found" });
    } else {  
      const updatedParkingLot = await ParkingLot.findOneAndUpdate(
        { name: parkingLotName }, 
        { $inc: { availableSlots: +1 } }, 
        { new: true, runValidators: true }
      );
      await ParkingSlot.findOneAndUpdate(
        { vehicleNumber: vehicleNumber, isOccupied: true },
        { $set: { isOccupied: false, exitTime: new Date() } }
      );
      const parkingFee = calculateParkingFee(entryTime=parking.entryTime, exitTime=new Date(), vehicleType=parking.vehicleType);
      return res.status(200).json({ message: "Vehicle exited successfully", parkingFee : parkingFee });
    }
  }
  catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


function calculateParkingFee(entryTime, exitTime, vehicleType) {
  const rates = {
      bike: { first2Hours: 20, perHour: 10, maxDaily: 150 },
      car: { first2Hours: 40, perHour: 20, maxDaily: 300 },
      bus: { first2Hours: 100, perHour: 50, maxDaily: 600 }
  };

  if (!rates[vehicleType]) {
    return "Invalid vehicle type!";
  }

  const entry = new Date(entryTime);
  const exit = new Date(exitTime);

  if (isNaN(entry.getTime()) || isNaN(exit.getTime())) {
    return "Invalid entry or exit time!";
  }

  if (exit <= entry) {
    return "Exit time must be after entry time!";
  }

  const totalHours = Math.ceil((exit - entry) / (1000 * 60 * 60)); 

  let fee = rates[vehicleType].first2Hours;
  
  if (totalHours > 2) {
      fee += (totalHours - 2) * rates[vehicleType].perHour;
  }

  // Apply Daily Maximum Limit
  const maxDays = Math.ceil(totalHours / 24);
  fee = Math.min(fee, rates[vehicleType].maxDaily * maxDays);
  return fee;
}

module.exports = {
  addParkingLot,
  getParkingLots,
  vehicleEntry,
  vehicleExit
};
