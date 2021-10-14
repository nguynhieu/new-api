"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../config"));
const deliveryAddressSchema = new mongoose_1.Schema({
    address: { type: String, required: true },
    ward: { type: String, required: true },
    district: { type: String, required: true },
    city: { type: String, required: true },
});
const userSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    avatar: { type: String, required: true, default: config_1.default.defaultAvatar },
    phone: { type: String },
    deliveryAddress: { type: deliveryAddressSchema },
    disable: { type: Boolean, required: true, default: false },
});
exports.default = (0, mongoose_1.model)('User', userSchema);
