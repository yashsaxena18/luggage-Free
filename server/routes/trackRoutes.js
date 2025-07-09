// routes/trackRoutes.js
import express from 'express';
import { getTrackingStatus } from '../controllers/trackController.js';

const router = express.Router();

// Route: GET /api/track/:trackingId
router.get('/:trackingId', getTrackingStatus);

export default router;
// This code defines the track routes for tracking luggage bookings.
// It uses Express.js to set up a route that retrieves the tracking status based on the tracking ID provided in the URL.
// The `getTrackingStatus` controller function is called to handle the request and return the tracking