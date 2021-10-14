"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const uploadMulter = (0, multer_1.default)({ dest: 'src/public/uploads/' });
const tour_controller_1 = require("../controller/tour.controller");
const router = (0, express_1.Router)();
router.get('/', tour_controller_1.getTours);
router.get('/:tourId', tour_controller_1.getTourDetail);
router.post('/', tour_controller_1.addTours);
router.put('/:tourId', tour_controller_1.updateTour);
router.delete('/:tourId', tour_controller_1.deleteTour);
router.post('/upload', uploadMulter.single('photo'), tour_controller_1.upload);
router.post('/:tourId/book', tour_controller_1.bookTour);
exports.default = router;
