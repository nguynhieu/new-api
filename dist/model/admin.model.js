"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../config"));
const adminSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, default: config_1.default.defaultAvatar },
});
exports.default = (0, mongoose_1.model)('Admin', adminSchema);
