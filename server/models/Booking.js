
// 1. Updated Booking Model (models/Booking.js)
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  luggageType: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  trackingId: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    default: "Awaiting Pickup",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;