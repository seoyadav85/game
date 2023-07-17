"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CommonController_1 = require("../controllers/CommonController");
class CommonRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.post();
        this.get();
    }
    post() { }
    get() {
        this.router.get("/category-list", CommonController_1.CommonController.categoryList);
    }
}
exports.default = new CommonRoutes().router;
