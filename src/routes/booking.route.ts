import { Router } from 'express'

import {
  getBookingHistory,
  updateStatusBooking,
} from '../controller/booking.controller'

const router = Router()

router.get('/history', getBookingHistory)
router.put('/:bookingId', updateStatusBooking)

export default router
