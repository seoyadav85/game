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
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseHelper_1 = require("../helpers/ResponseHelper");
const Auth_1 = require("../Utils/Auth");
const Admin_1 = require("../models/Admin");
const User_1 = require("../models/User");
// import Admin from "../models/adminModel"
class Authentication {
    constructor() { }
    static user(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(req.headers.cookie,"req.cookie.access_token")
            const startTime = new Date().getTime();
            try {
                let token;
                if (req.headers.authorization &&
                    req.headers.authorization.startsWith("Bearer")) {
                    token = req.headers.authorization.split(" ")[1];
                }
                // if (
                //   req.headers.cookie &&
                //   req.headers.cookie.startsWith("token=")
                // ) {
                //   token = req.headers.cookie.split("token=")[1];
                // }
                if (!token) {
                    return ResponseHelper_1.default.unAuthenticated(res, "UNAUTHORIZE", "UNAUTHORIZE", {}, startTime, 0);
                }
                const decoded = yield Auth_1.default.decodeJwt(token);
                const currentUser = yield User_1.default.findById(decoded._id);
                // console.log(decoded);
                if (!currentUser) {
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "User not exist", currentUser, startTime);
                }
                if (!currentUser.is_active) {
                    return ResponseHelper_1.default.unAuthorize(res, "FORBIDDEN", "Account Deactivated Please contact to admin", {}, startTime);
                }
                req.user = currentUser;
                req.user.id = decoded.id;
                next();
            }
            catch (err) {
                return next(err);
            }
        });
    }
    static admin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(req.headers.cookie,"req.cookie.access_token")
            const startTime = new Date().getTime();
            try {
                let token;
                if (req.headers.authorization &&
                    req.headers.authorization.startsWith("Bearer")) {
                    token = req.headers.authorization.split(" ")[1];
                }
                if (!token) {
                    return ResponseHelper_1.default.unAuthenticated(res, "UNAUTHORIZE", "UNAUTHORIZE", {}, startTime, 0);
                }
                const decoded = yield Auth_1.default.decodeJwt(token);
                const currentUser = yield Admin_1.default.findById(decoded.id);
                // console.log(currentUser);
                if (!currentUser) {
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "User not exist , go to signup page", currentUser, startTime);
                }
                req.user = currentUser;
                req.user.id = decoded.id;
                next();
            }
            catch (err) {
                return next(err);
            }
        });
    }
}
exports.default = Authentication;
