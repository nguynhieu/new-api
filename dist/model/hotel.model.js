"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const hotelSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    remainingSlot: { type: Number, required: true },
    detail: { type: String, required: true },
});
exports.default = (0, mongoose_1.model)('Hotel', hotelSchema);
