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
exports.changePassword = exports.updateProfile = exports.getProfile = void 0;
const status_constant_1 = __importDefault(require("../constant/status.constant"));
const user_model_1 = __importDefault(require("../model/user.model"));
const firebase_1 = require("../service/firebase");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("../config"));
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.payloadToken;
    try {
        const queryUser = yield user_model_1.default.findById(_id, { password: 0 });
        return res.status(status_constant_1.default.OK).send(queryUser);
    }
    catch (error) {
        return res.status(status_constant_1.default.BAD_REQUEST).send(error);
    }
});
exports.getProfile = getProfile;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body: requestBody, payloadToken: { _id }, } = req;
    try {
        const queryUser = yield user_model_1.default.findOne({ _id });
        if (!queryUser) {
            return res.sendStatus(status_constant_1.default.INTERNAL_SERVER_ERROR);
        }
        const cloneUser = JSON.parse(JSON.stringify(queryUser));
        // If there's a new avatar, upload new avatar to Firebase and get avatar url instead of base64 string
        let updatedUser;
        if (cloneUser.avatar !== requestBody.avatar) {
            const avatarName = _id;
            const avatarUrl = yield (0, firebase_1.uploadAvatar)(avatarName, requestBody.avatar);
            updatedUser = Object.assign(Object.assign(Object.assign({}, cloneUser), requestBody), { avatar: avatarUrl });
        }
        else {
            updatedUser = Object.assign(Object.assign({}, cloneUser), requestBody);
        }
        yield user_model_1.default.replaceOne({ _id }, updatedUser);
        const newUser = yield user_model_1.default.findOne({ _id });
        return res.status(status_constant_1.default.OK).send(newUser);
    }
    catch (error) {
        return res.status(status_constant_1.default.INTERNAL_SERVER_ERROR).send(error);
    }
});
exports.updateProfile = updateProfile;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { payloadToken: { _id }, body: { oldPassword, newPassword }, } = req;
    const queryUser = yield user_model_1.default.findOne({ _id });
    if (!queryUser) {
        return res.sendStatus(status_constant_1.default.INTERNAL_SERVER_ERROR);
    }
    const result = yield bcryptjs_1.default.compare(oldPassword, queryUser.password);
    if (!result) {
        return res.status(status_constant_1.default.BAD_REQUEST).send('Old password is incorrect');
    }
    const salt = yield bcryptjs_1.default.genSalt(config_1.default.saltWorkFactor);
    const hashedPassword = yield bcryptjs_1.default.hash(newPassword, salt);
    queryUser.password = hashedPassword;
    try {
        yield queryUser.save();
    }
    catch (error) {
        return res.sendStatus(status_constant_1.default.INTERNAL_SERVER_ERROR);
    }
    return res.sendStatus(status_constant_1.default.OK);
});
exports.changePassword = changePassword;
