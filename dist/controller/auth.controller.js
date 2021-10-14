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
exports.register = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const status_constant_1 = __importDefault(require("../constant/status.constant"));
const user_model_1 = __importDefault(require("../model/user.model"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_model_1.default.findOne({ email });
    // check if user does not exist then respond BAD REQUEST status
    if (!user) {
        return res.status(status_constant_1.default.BAD_REQUEST).send('user does not exist');
    }
    // compare password with hash if different then respond BAD REQUEST status
    const validPassword = yield bcryptjs_1.default.compare(password, user.password);
    if (!validPassword) {
        return res.status(status_constant_1.default.BAD_REQUEST).send('password is incorrect');
    }
    // generate access token
    const payload = { _id: user._id };
    const token = jsonwebtoken_1.default.sign(payload, config_1.default.jwtPrivateKey, {
        expiresIn: config_1.default.refreshTokenTtl,
    });
    // respond OK status with access token
    return res.status(status_constant_1.default.OK).json({ token });
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password } = req.body;
    const existingUser = yield user_model_1.default.findOne({ email });
    // check if user exists then respond BAD REQUEST status
    if (existingUser) {
        return res.status(status_constant_1.default.BAD_REQUEST).send('email has been taken');
    }
    //use bcrypt to generate hashed password
    const salt = yield bcryptjs_1.default.genSalt(config_1.default.saltWorkFactor);
    const hash = yield bcryptjs_1.default.hash(password, salt);
    const newUser = new user_model_1.default({
        email,
        username,
        password: hash,
    });
    try {
        // insert new user document to database
        const savedUser = yield newUser.save();
        // generate access token
        const payload = { _id: savedUser._id };
        const token = jsonwebtoken_1.default.sign(payload, config_1.default.jwtPrivateKey, {
            expiresIn: config_1.default.refreshTokenTtl,
        });
        // respond CREATE status with access token
        return res.status(status_constant_1.default.CREATED).json({ token });
    }
    catch (err) {
        // if user value is not valid then respond status BAD REQUEST with err
        return res.status(status_constant_1.default.BAD_REQUEST).send(err);
    }
});
exports.register = register;
