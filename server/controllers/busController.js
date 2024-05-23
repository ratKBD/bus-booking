const mongoose = require("mongoose");
const Bus = require("../models/busModel");
const createError = require("../utils/appError");

exports.busInfo = async (req, res, next) => {
  try {
    const buses = await Bus.find({});
    res.status(200).json({
      status: "success",
      results: buses.length,
      data: {
        buses,
      },
    });
  } catch (error) {
    console.error("Error retrieving bus information:", error);
    return next(createError(500, "Failed to retrieve bus information"));
  }
};

exports.createBus = async (req, res, next) => {
  try {
    console.log("Request body for creating bus:", req.body);

    const { name, seats } = req.body;
    if (!name || !seats || !Array.isArray(seats)) {
      console.error("Invalid input data. Name and seats are required.");
      return res
        .status(400)
        .json({ status: "error", message: "Invalid input data" });
    }

    const bus = new Bus({ name, seats });
    await bus.save();

    console.log("Bus created successfully:", bus);

    res.status(201).json({
      status: "success",
      data: {
        bus,
      },
    });
  } catch (error) {
    console.error("Error creating bus:", error);
    next(createError(500, "Failed to create bus"));
  }
};
exports.updateBusInfo = async (req, res, next) => {
  try {
    let { id } = req.params;
    const { seatNo, gender, price, booked } = req.body;

    console.log("Received request to update bus information. Bus ID:", id);

    // Check if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Invalid ObjectId:", id);
      return res
        .status(400)
        .json({ status: "error", message: "Invalid Bus ID" });
    }

    // Query the database for a bus with the specified id
    const bus = await Bus.findById(id);
    console.log("bus-->", bus);
    if (!bus) {
      console.log("Bus not found for ID:", id);
      return res
        .status(404)
        .json({ status: "error", message: "Bus not found" });
    }

    const seatIndex = bus.seats.findIndex((seat) => seat.seatNo === seatNo);
    if (seatIndex === -1) {
      console.log("Seat not found for seat number:", seatNo);
      return res
        .status(404)
        .json({ status: "error", message: "Seat not found" });
    }

    console.log("Updating seat details for seat number:", seatNo);

    // Update seat details if provided in the request
    if (gender !== undefined) bus.seats[seatIndex].gender = gender;
    if (price !== undefined) bus.seats[seatIndex].price = price;
    if (booked !== undefined) bus.seats[seatIndex].booked = booked;

    // Save the updated bus information
    await bus.save();
    console.log("Bus information updated successfully.");

    res.status(200).json({
      status: "success",
      data: {
        bus,
      },
    });
  } catch (error) {
    console.error("Error updating bus information:", error);
    next(createError(500, "Failed to update bus information"));
  }
};
