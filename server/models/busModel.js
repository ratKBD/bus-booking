// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// const seatSchema = new Schema({
//   seatNo: { type: Number, required: true },
//   gender: { type: String, enum: ["Male", "Female"], required: true },
//   price: { type: Number, required: true },
//   booked: { type: Boolean, required: true },
// });

// const busSchema = new Schema({
//   busName: { type: String, required: true },
//   seats: [seatSchema],
// });

// const Bus = mongoose.model("BusInfo", busSchema);

// module.exports = Bus;

// models/busModel.js
const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  seatNo: { type: Number, required: true },
  gender: { type: String, required: false },
  price: { type: Number, required: true },
  booked: { type: Boolean, required: true },
});

const busSchema = new mongoose.Schema({
  name: { type: String, required: true },
  seats: [seatSchema],
});

const Bus = mongoose.model("Bus", busSchema);

module.exports = Bus;
