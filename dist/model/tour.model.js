"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tourSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: String, required: true },
    star: { type: String, required: true },
    startDate: { type: Date },
    description: { type: String, required: true },
    address: { type: String, required: true },
    remainSlot: { type: Number },
    createdAt: { type: Date, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
});
exports.default = (0, mongoose_1.model)('Tour', tourSchema);
