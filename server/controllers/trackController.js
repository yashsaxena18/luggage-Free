// controllers/trackController.js
import Booking from '../models/Booking.js';

// GET /api/track/:trackingId
export const getTrackingStatus = async (req, res) => {
  try {
    const { trackingId } = req.params;
    console.log("📡 Fetching booking for tracking ID:", trackingId);

    const booking = await Booking.findOne({ trackingId });

    if (!booking) {
      return res.status(404).json({ message: 'Tracking ID not found' });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error("❌ Error fetching tracking data:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
// This code defines a controller function for tracking luggage bookings by their tracking ID.
// It retrieves the booking from the database and returns it in the response.