"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// config env
dotenv_1.default.config();
const config = {
    // server
    port: process.env.PORT,
    // node env
    NOTE_ENV: process.env.NODE_ENV,
    // database
    dbUri: process.env.MONGODB_URI || '',
    defaultAvatar: process.env.DEFAULT_AVATAR || '',
    // jwt
    jwtPrivateKey: process.env.JWT_PRIVATE_KEY || '',
    refreshTokenTtl: '2d',
    // bcrypt
    saltWorkFactor: 10,
};
exports.default = config;
