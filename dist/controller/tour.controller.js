"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.bookTour = exports.upload = exports.deleteTour = exports.updateTour = exports.addTours = exports.getTourDetail = exports.getTours = void 0;
const lodash_1 = __importDefault(require("lodash"));
const status_constant_1 = __importDefault(require("../constant/status.constant"));
const tour_model_1 = __importDefault(require("../model/tour.model"));
const booking_model_1 = __importStar(require("../model/booking.model"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const getTours = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10, name = '', phone = '', price, createdAt = '', address = '', sort = '', } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const dateQuery = createdAt ? new Date(createdAt) : new Date();
    dateQuery.setDate(dateQuery.getDate() + 1);
    try {
        const tours = yield tour_model_1.default.find(Object.assign({ name: new RegExp(name, 'i'), phone: new RegExp(phone, 'i'), address: new RegExp(address, 'i'), createdAt: {
                $lte: dateQuery,
            } }, (price ? { price: { $lte: Number(price) } } : {})))
            .sort({ _id: sort === 'desc' ? -1 : 1 })
            .skip(skip)
            .limit(Number(limit));
        const totalTour = yield tour_model_1.default.count();
        const pages = Math.ceil(totalTour / Number(limit));
        return res.status(status_constant_1.default.OK).send({
            data: tours,
            total: totalTour,
            page,
            limit,
            pages,
        });
    }
    catch (error) {
        return res.status(status_constant_1.default.BAD_REQUEST).send(error);
    }
});
exports.getTours = getTours;
const getTourDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tourId } = req.params;
    try {
        const tour = yield tour_model_1.default.findById(tourId);
        return res.status(status_constant_1.default.OK).send(tour);
    }
    catch (error) {
        return res.status(status_constant_1.default.BAD_REQUEST).send(error);
    }
});
exports.getTourDetail = getTourDetail;
const addTours = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        yield tour_model_1.default.insertMany([Object.assign(Object.assign({}, data), { createdAt: new Date(), star: 10 })]);
        return res.status(status_constant_1.default.OK).send({ message: 'Created successfuly' });
    }
    catch (error) {
        return res.status(status_constant_1.default.BAD_REQUEST).send(error);
    }
});
exports.addTours = addTours;
const updateTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tourId } = req.params;
    const { name, address, description, email, image, phone, price } = req.body;
    try {
        yield tour_model_1.default.updateOne({ _id: tourId }, { name, address, description, email, image, phone, price });
        return res.status(status_constant_1.default.OK).send({ message: 'Updated successfuly' });
    }
    catch (error) {
        return res.status(status_constant_1.default.BAD_REQUEST).send(error);
    }
});
exports.updateTour = updateTour;
const deleteTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tourId } = req.params;
    try {
        yield tour_model_1.default.deleteOne({ _id: tourId });
        return res.status(status_constant_1.default.OK).send({ message: 'Deleted successfuly' });
    }
    catch (error) {
        return res.status(status_constant_1.default.BAD_REQUEST).send(error);
    }
});
exports.deleteTour = deleteTour;
const upload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const photo = req.file;
    try {
        if (photo) {
            const { url } = yield cloudinary_1.default.uploader.upload(photo === null || photo === void 0 ? void 0 : photo.path);
            return res.status(status_constant_1.default.OK).send({
                url,
            });
        }
    }
    catch (error) {
        return res.status(status_constant_1.default.BAD_REQUEST).send(error);
    }
});
exports.upload = upload;
const bookTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tourId } = req.params;
    const { dateFrom, dateTo, phone, email } = req.body;
    try {
        const tour = yield tour_model_1.default.findById(tourId);
        yield booking_model_1.default.insertMany([
            {
                tour,
                dateFrom,
                dateTo,
                status: booking_model_1.bookingStatus[booking_model_1.bookingStatus.PENDING],
                createdAt: new Date(),
                phone,
                email,
            },
        ]);
        return res.status(status_constant_1.default.OK).send({ message: 'Created successfuly' });
    }
    catch (error) {
        const errs = lodash_1.default.map(error.errors, (item) => item.message);
        return res.status(status_constant_1.default.BAD_REQUEST).send(errs[0]);
    }
});
exports.bookTour = bookTour;
