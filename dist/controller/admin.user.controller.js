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
exports.blockUser = exports.searchUser = exports.getUsers = void 0;
const status_constant_1 = __importDefault(require("../constant/status.constant"));
const user_model_1 = __importDefault(require("../model/user.model"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const queryUsers = yield user_model_1.default.find({}, { password: 0 });
    if (!queryUsers) {
        return res.sendStatus(status_constant_1.default.NO_CONTENT);
    }
    return res.status(status_constant_1.default.OK).send(queryUsers);
});
exports.getUsers = getUsers;
const searchUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { q } = req.query;
    if (!q) {
        return res.status(status_constant_1.default.BAD_REQUEST).send('Query string is not valid');
    }
    try {
        const queryUsers = yield user_model_1.default.find({
            $or: [
                { email: new RegExp(q) },
                { phone: new RegExp(q) },
                { username: new RegExp(q) },
            ],
        }, { password: 0 });
        return res.status(status_constant_1.default.OK).send(queryUsers);
    }
    catch (error) {
        return res.status(status_constant_1.default.BAD_REQUEST).send(error);
    }
});
exports.searchUser = searchUser;
const blockUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const queryUser = yield user_model_1.default.findById(userId);
        if (queryUser) {
            queryUser.disable = !queryUser.disable;
            yield queryUser.save();
        }
        return res.send(queryUser);
    }
    catch (error) {
        return res.status(status_constant_1.default.BAD_REQUEST).send(error);
    }
});
exports.blockUser = blockUser;
