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
exports.uploadAvatar = void 0;
const firebase_config_1 = __importDefault(require("../config/firebase.config"));
const storage_1 = require("firebase/storage");
const storage = (0, storage_1.getStorage)(firebase_config_1.default);
const avatarFolderString = 'avatar/';
const typeUploadString = 'base64';
const uploadAvatar = (avatarName, base64String) => __awaiter(void 0, void 0, void 0, function* () {
    const avatarRef = (0, storage_1.ref)(storage, avatarFolderString + avatarName);
    try {
        const snapshot = yield (0, storage_1.uploadString)(avatarRef, base64String, typeUploadString);
        const downloadURL = yield (0, storage_1.getDownloadURL)(snapshot.ref);
        return downloadURL;
    }
    catch (error) {
        return error;
    }
});
exports.uploadAvatar = uploadAvatar;
