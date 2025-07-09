import Booking from '../models/Booking.js';
import crypto from 'crypto';

// ✅ 1. CREATE BOOKING
export const createBooking = async (req, res) => {
  try {
    console.log("🔥 Creating booking for user:", req.user._id);
    console.log("📦 Booking data received:", req.body);

    const trackingId = crypto.randomBytes(6).toString('hex');

    const bookingData = {
      user: req.user._id,
      source: req.body.source,
      destination: req.body.destination,
      date: req.body.date,
      luggageType: req.body.luggageType,
      weight: req.body.weight,
      trackingId: trackingId,
      status: "Awaiting Pickup"
    };

    console.log("📋 Processed booking data:", bookingData);

    const newBooking = new Booking(bookingData);
    await newBooking.save();

    console.log("✅ Booking saved successfully:", newBooking);

    res.status(201).json({
      message: 'Booking created successfully',
      booking: newBooking
    });
  } catch (error) {
    console.error("❌ Booking creation failed:", error);
    res.status(500).json({
      message: 'Booking failed',
      error: error.message
    });
  }
};

// ✅ 2. GET MY BOOKINGS
export const getMyBookings = async (req, res) => {
  try {
    console.log("🔍 Fetching bookings for user:", req.user._id);

    const bookings = await Booking.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .lean();

    console.log("📋 Found bookings:", bookings);
    res.status(200).json({ bookings });
  } catch (error) {
    console.error("❌ Fetching bookings failed:", error);
    res.status(500).json({
      message: 'Could not fetch bookings',
      error: error.message
    });
  }
};

// ✅ 3. TRACK BOOKING
export const trackBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(booking);
  } catch (error) {
    console.error("❌ Tracking failed:", error);
    res.status(500).json({ message: "Tracking failed", error: error.message });
  }
};

// ✅ 4. CANCEL BOOKING
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking || booking.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Booking not found or unauthorized" });
    }

    if (booking.status !== "Awaiting Pickup") {
      return res.status(400).json({ message: "Cannot cancel. Booking already picked up or processed." });
    }

    booking.status = "Cancelled";
    await booking.save();

    res.status(200).json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    console.error("❌ Cancel booking failed:", error);
    res.status(500).json({ message: "Cancel booking failed", error: error.message });
  }
};


// ✅ 5. MODIFY BOOKING
export const updateBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    console.log("✏️ Updating booking ID:", bookingId);
    console.log("📦 Request body:", req.body);

    // Ensure valid MongoDB ObjectId
    if (!bookingId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid booking ID format" });
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to edit this booking" });
    }

    if (booking.status !== "Awaiting Pickup") {
      return res.status(400).json({
        message: "Only bookings with status 'Awaiting Pickup' can be modified",
      });
    }

    // Allowed editable fields
    const { destination, date, weight } = req.body;

    if (!destination && !date && !weight) {
      return res.status(400).json({
        message: "Please provide at least one field (destination, date, weight) to update",
      });
    }

    if (destination) booking.destination = destination;
    if (date) booking.date = date;
    if (weight) booking.weight = weight;

    await booking.save();

    console.log("✅ Booking updated:", booking._id);

    res.status(200).json({
      message: "Booking updated successfully",
      booking,
    });
  } catch (error) {
    console.error("❌ Error updating booking:", error);
    res.status(500).json({
      message: "Update failed",
      error: error.message,
    });
  }
};
