"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authnetication_1 = require("../../Middlewares/Authnetication");
const StaffController_1 = require("../../controllers/Admin/StaffController");
class StaffRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.post();
        this.get();
        this.put();
    }
    post() {
        this.router.post("/add-staff", Authnetication_1.default.admin, StaffController_1.StaffController.addStaff);
        this.router.post("/change-password", Authnetication_1.default.admin, StaffController_1.StaffController.changePassword);
    }
    get() {
        this.router.get("/list", Authnetication_1.default.admin, StaffController_1.StaffController.list);
    }
    put() {
        this.router.put("/edit-staff/:id", Authnetication_1.default.admin, StaffController_1.StaffController.editStaff);
    }
}
exports.default = new StaffRouter().router;
