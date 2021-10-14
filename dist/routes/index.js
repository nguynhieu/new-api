"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authorization_middleware_1 = require("../middleware/authorization.middleware");
const admin_auth_route_1 = __importDefault(require("./admin.auth.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
const profile_route_1 = __importDefault(require("./profile.route"));
const tour_route_1 = __importDefault(require("./tour.route"));
const booking_route_1 = __importDefault(require("./booking.route"));
const hotel_route_1 = __importDefault(require("./hotel.route"));
const routes = (app) => {
    app.use('/api/admin', admin_auth_route_1.default);
    app.use('/api/auth', auth_route_1.default);
    app.use('/api/profile', authorization_middleware_1.checkAuthorized, profile_route_1.default);
    app.use('/api/profile', authorization_middleware_1.checkAuthorized, profile_route_1.default);
    app.use('/api/profile', authorization_middleware_1.checkAuthorized, profile_route_1.default);
    app.use('/api/tours', tour_route_1.default);
    app.use('/api/booking', authorization_middleware_1.checkAuthorized, booking_route_1.default);
    app.use('/api/hotel', hotel_route_1.default);
};
exports.default = routes;
