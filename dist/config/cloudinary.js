"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME || 'rei',
    api_key: process.env.API_KEY || '648455811235865',
    api_secret: process.env.API_SECRET || 'ge8zfwVr9-fZQ8UKqV28PAz9UTw',
});
exports.default = cloudinary_1.v2;
