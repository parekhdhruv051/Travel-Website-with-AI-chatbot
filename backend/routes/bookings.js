import express from 'express';

import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';
import { createBooking, getAllBooking, getBooking } from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', verifyToken, createBooking);
router.get('/:id', verifyUser, getBooking);
router.get('/', verifyAdmin, getAllBooking);


console.log('✅ bookings.js route loaded');

export default router; 