"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config"));
const connect_1 = __importDefault(require("./database/connect"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// for parsing application/json and parsing application/x-www-form-urlencoded
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// for save static files in public folder
app.use(express_1.default.static('public'));
app.listen(config_1.default.port, () => {
    console.log(`Oneforall has been ready to hear you on port ${config_1.default.port}`);
    (0, connect_1.default)();
    (0, routes_1.default)(app);
});
