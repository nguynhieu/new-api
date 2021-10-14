"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdatedProfile = void 0;
const joi_1 = __importDefault(require("joi"));
const status_constant_1 = __importDefault(require("../constant/status.constant"));
const validateUpdatedProfile = (req, res, next) => {
    const updatedUserSchema = joi_1.default.object({
        username: joi_1.default.string().min(1).required(),
        avatar: joi_1.default.string().allow('').required(),
        phone: joi_1.default.string().allow('').required(),
        deliveryAddress: joi_1.default.object({
            address: joi_1.default.string().allow('').required(),
            ward: joi_1.default.string().allow('').required(),
            district: joi_1.default.string().allow('').required(),
            city: joi_1.default.string().allow('').required(),
        }),
    });
    const { error } = updatedUserSchema.validate(req.body);
    if (error) {
        return res
            .status(status_constant_1.default.BAD_REQUEST)
            .send({ message: error.details[0].message });
    }
    next();
};
exports.validateUpdatedProfile = validateUpdatedProfile;
