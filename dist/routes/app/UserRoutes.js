"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthValidation_1 = require("../../validators/app/AuthValidation");
const UserController_1 = require("../../controllers/User/UserController");
const Authnetication_1 = require("../../Middlewares/Authnetication");
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.post();
        this.get();
    }
    post() {
        this.router.post("/coin-update", AuthValidation_1.default.coinValidation, Authnetication_1.default.user, UserController_1.UserController.coinUpdate);
    }
    get() { }
}
exports.default = new UserRoutes().router;
