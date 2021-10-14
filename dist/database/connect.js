"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
const connect = () => {
    mongoose_1.default
        .connect(config_1.default.dbUri)
        .then(() => {
        console.log('Dbs connected');
    })
        .catch((error) => {
        console.log('Opps I came across something');
        console.log(error);
    });
};
exports.default = connect;
