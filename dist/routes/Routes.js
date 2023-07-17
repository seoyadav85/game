"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthRouter_1 = require("./admin/AuthRouter");
const StaffRouter_1 = require("./admin/StaffRouter");
const AuthRoutes_1 = require("./app/AuthRoutes");
const UserRoutes_1 = require("./app/UserRoutes");
const CategoryRouter_1 = require("./admin/CategoryRouter");
const CommonRoutes_1 = require("./CommonRoutes");
class Routes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.app();
        this.admin();
        this.common();
    }
    app() {
        this.router.use("/app/auth", AuthRoutes_1.default);
        this.router.use("/app/user", UserRoutes_1.default);
    }
    admin() {
        this.router.use("/admin/auth", AuthRouter_1.default);
        this.router.use("/admin/staff", StaffRouter_1.default);
        this.router.use("/admin/category", CategoryRouter_1.default);
    }
    common() {
        this.router.use("/common", CommonRoutes_1.default);
    }
}
exports.default = new Routes().router;
