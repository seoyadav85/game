"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthValidation_1 = require("../../validators/app/AuthValidation");
const AuthController_1 = require("../../controllers/User/AuthController");
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.post();
        this.get();
    }
    post() {
        this.router.post("/login", AuthValidation_1.default.loginValidation, AuthController_1.AuthController.login);
        this.router.post("/forget-password", AuthValidation_1.default.forgetPasswordValidation, AuthController_1.AuthController.forgetpassword);
        this.router.post("/reset-password", AuthValidation_1.default.resetPasswordValidation, AuthController_1.AuthController.resetPassword);
        this.router.post("/verify-otp", AuthValidation_1.default.verifyOTPValidation, AuthController_1.AuthController.verifyOTP);
    }
    get() { }
}
exports.default = new AuthRoutes().router;
