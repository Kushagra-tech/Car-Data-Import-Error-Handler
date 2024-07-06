const mongoose = require("mongoose");

const carDetailsSchema = new mongoose.Schema(
  {
    Make: {
      type: String,
    },
    Model: {
      type: String,
    },
    Year: {
      type: Number,
    },
    Color: {
      type: String,
    },
    Price: {
      type: Number,
    },
    Mileage: {
      type: Number,
    },
    Transmission: {
      type: String,
      enum: ["Automatic", "Manual", "CVT", "DSG"],
    },
    FuelType: {
      type: String,
      enum: ["Gasoline", "Diesel", "Hybrid", "Electric"],
    },
  },
  { timestamps: true }
);
const CarDetails = mongoose.model("CarDetails", carDetailsSchema);
module.exports = CarDetails;
