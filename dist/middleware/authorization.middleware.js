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
exports.checkAuthorized = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const lodash_1 = __importDefault(require("lodash"));
const config_1 = __importDefault(require("../config"));
const status_constant_1 = __importDefault(require("../constant/status.constant"));
const checkAuthorized = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers['authorization']) {
        return res.status(status_constant_1.default.UNAUTHORIZED).send('Unauthorized');
    }
    const token = lodash_1.default.split(req.headers['authorization'], ' ')[1];
    try {
        const payload = jsonwebtoken_1.default.verify(token, config_1.default.jwtPrivateKey);
        req.payloadToken = payload;
        next();
    }
    catch (error) {
        return res.status(status_constant_1.default.FORBIDDEN).send('Forbidden');
    }
});
exports.checkAuthorized = checkAuthorized;
