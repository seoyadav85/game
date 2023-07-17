"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authnetication_1 = require("../../Middlewares/Authnetication");
const CategoryController_1 = require("../../controllers/Admin/CategoryController");
class CategoryRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.post();
        this.get();
        this.put();
    }
    post() {
        this.router.post("/add-category", Authnetication_1.default.admin, CategoryController_1.CategoryController.addStaff);
    }
    get() {
        this.router.get("/list", Authnetication_1.default.admin, CategoryController_1.CategoryController.list);
    }
    put() {
        this.router.put("/edit-category/:id", Authnetication_1.default.admin, CategoryController_1.CategoryController.editStaff);
    }
}
exports.default = new CategoryRouter().router;
