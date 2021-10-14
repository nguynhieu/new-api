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
exports.deleteHotel = exports.updateHotel = exports.addHotel = exports.getHotelList = void 0;
const status_constant_1 = __importDefault(require("../constant/status.constant"));
const hotel_model_1 = __importDefault(require("../model/hotel.model"));
const getHotelList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotelList = yield hotel_model_1.default.find();
        return res.status(status_constant_1.default.OK).json({ hotelList });
    }
    catch (err) {
        return res.sendStatus(status_constant_1.default.BAD_REQUEST);
    }
});
exports.getHotelList = getHotelList;
const addHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const existingHotel = yield hotel_model_1.default.findOne({ name: req.body.name });
    if (existingHotel) {
        return res.status(status_constant_1.default.BAD_REQUEST).send('hotel already exists');
    }
    console.log(req.body);
    const newHotel = new hotel_model_1.default(Object.assign({}, req.body));
    try {
        const savedHotel = yield newHotel.save();
        return res.status(status_constant_1.default.OK).json({ hotel: savedHotel });
    }
    catch (err) {
        return res.status(status_constant_1.default.BAD_REQUEST).send(err);
    }
});
exports.addHotel = addHotel;
const updateHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { hotelId: _id } = req.params;
    try {
        const updatedHotel = yield hotel_model_1.default.findByIdAndUpdate(_id, Object.assign({}, req.body), { new: true });
        return res.status(status_constant_1.default.OK).json({ updatedHotel });
    }
    catch (err) {
        return res.status(status_constant_1.default.BAD_REQUEST).send(err);
    }
});
exports.updateHotel = updateHotel;
const deleteHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { hotelId: _id } = req.params;
    try {
        yield hotel_model_1.default.findByIdAndDelete(_id);
        return res.status(status_constant_1.default.OK).send('successful delete');
    }
    catch (err) {
        return res.status(status_constant_1.default.BAD_REQUEST).send(err);
    }
});
exports.deleteHotel = deleteHotel;
