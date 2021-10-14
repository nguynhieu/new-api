"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingStatus = void 0;
const mongoose_1 = require("mongoose");
const tour_model_1 = __importDefault(require("./tour.model"));
var bookingStatus;
(function (bookingStatus) {
    bookingStatus[bookingStatus["PENDING"] = 0] = "PENDING";
    bookingStatus[bookingStatus["REJECTED"] = 1] = "REJECTED";
    bookingStatus[bookingStatus["ACCEPTED"] = 2] = "ACCEPTED";
})(bookingStatus = exports.bookingStatus || (exports.bookingStatus = {}));
const tourSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Schema.Types.ObjectId, ref: tour_model_1.default, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    star: { type: Number, required: true },
});
const bookingSchema = new mongoose_1.Schema({
    tour: { type: tourSchema, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    status: {
        type: String,
        emum: ['PENDING', 'REJECTED', 'ACCEPTED'],
        default: 'PENDING',
    },
    createdAt: { type: Date, required: true },
    dateFrom: { type: Date, required: true },
    dateTo: { type: Date, required: true },
});
exports.default = (0, mongoose_1.model)('Booking', bookingSchema);
