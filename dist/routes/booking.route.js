"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booking_controller_1 = require("../controller/booking.controller");
const router = (0, express_1.Router)();
router.get('/history', booking_controller_1.getBookingHistory);
router.put('/:bookingId', booking_controller_1.updateStatusBooking);
exports.default = router;
