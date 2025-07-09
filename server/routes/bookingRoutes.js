import express from 'express';
import {
  createBooking,
  trackBooking,
  getMyBookings,
  cancelBooking,       // ✅ New controller import
  updateBooking        // ✅ New controller import
} from '../controllers/bookingController.js';

import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, createBooking);
router.get('/track/:id', protect, trackBooking);
router.get('/my-bookings', protect, getMyBookings);

// ✅ Add these two routes below:
router.put('/cancel/:id', protect, cancelBooking);      // Cancel booking
router.put('/modify/:id', protect, updateBooking);      // Edit destination/date

export default router;
