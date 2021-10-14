"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_user_controller_1 = require("../controller/admin.user.controller");
const router = (0, express_1.Router)();
router.get('/', admin_user_controller_1.getUsers);
router.post('/', admin_user_controller_1.searchUser);
router.patch('/:userId/block', admin_user_controller_1.blockUser);
exports.default = router;
