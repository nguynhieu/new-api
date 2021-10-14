"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatusBooking = exports.getBookingHistory = void 0;
const lodash_1 = __importDefault(require("lodash"));
const status_constant_1 = __importDefault(require("../constant/status.constant"));
const booking_model_1 = __importDefault(require("../model/booking.model"));
const getBookingHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit = 10, page = 1 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    try {
        const tour = yield booking_model_1.default.find()
            .sort({ _id: -1 })
            .skip(skip)
            .limit(Number(limit));
        return res.status(status_constant_1.default.OK).send(tour);
    }
    catch (error) {
        return res.status(status_constant_1.default.BAD_REQUEST).send(error);
    }
});
exports.getBookingHistory = getBookingHistory;
const updateStatusBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status } = req.body;
    const { bookingId } = req.params;
    if (!lodash_1.default.includes(['PENDING', 'REJECTED', 'ACCEPTED'], status)) {
        return res.status(status_constant_1.default.BAD_REQUEST).send('Status must be a enum');
    }
    try {
        yield booking_model_1.default.findOneAndUpdate({ _id: bookingId }, {
            status,
        });
        return res.status(status_constant_1.default.OK).send('Updated succesfuly');
    }
    catch (error) {
        return res.status(status_constant_1.default.BAD_REQUEST).send(error);
    }
});
exports.updateStatusBooking = updateStatusBooking;
