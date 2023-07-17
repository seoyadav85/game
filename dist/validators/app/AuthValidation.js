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
// import { validate } from "../../helpers/ValidationHelper";
const Joi = require("joi");
// import { ReqInterface, ResInterface } from "../../interfaces/RequestInterface"
// import _RS from "../../helpers/ResponseHelper"
const ValidationHelper_1 = require("../../helpers/ValidationHelper");
var UserTypeRole;
(function (UserTypeRole) {
    UserTypeRole["Expact"] = "Expact";
    UserTypeRole["Psychologist"] = "Psychologist";
})(UserTypeRole || (UserTypeRole = {}));
var LoginTypeRole;
(function (LoginTypeRole) {
    LoginTypeRole["Email"] = "Email";
    LoginTypeRole["Google"] = "Google";
    LoginTypeRole["Facebook"] = "Facebook";
    LoginTypeRole["Apple"] = "Apple";
})(LoginTypeRole || (LoginTypeRole = {}));
class AuthValidation {
    static loginValidation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                userName: Joi.string().required(),
                password: Joi.string().required(),
            });
            const isValid = yield (0, ValidationHelper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
    static signUpValidation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                email: Joi.string().required().email(),
                // password: Joi.string().regex(strongPasswordRegex).error(stringPassswordError).required(),
                password: Joi.string()
                    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
                    .required()
                    .messages({
                    "string.pattern.base": `Password should be between 3 to 30 characters and contain letters or numbers only`,
                    "string.empty": `Password cannot be empty`,
                    "any.required": `Password is required`,
                }),
                userName: Joi.string().required(),
            });
            const isValid = yield (0, ValidationHelper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
    static profileValidation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                name: Joi.string().required(),
                phoneNumber: Joi.string()
                    .required()
                    .pattern(/^[0-9]+$/)
                    .max(15)
                    .min(9),
            });
            const isValid = yield (0, ValidationHelper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
    static forgetPasswordValidation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                userName: Joi.string().required(),
            });
            const isValid = yield (0, ValidationHelper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
    static verifyOTPValidation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                userName: Joi.string().required(),
                otp: Joi.string().required(),
            });
            const isValid = yield (0, ValidationHelper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
    static resetPasswordValidation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                userName: Joi.string().required(),
                password: Joi.string()
                    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
                    .required()
                    .messages({
                    "string.pattern.base": `Password should be between 3 to 30 characters and contain letters or numbers only`,
                    "string.empty": `Password cannot be empty`,
                    "any.required": `Password is required`,
                }),
            });
            const isValid = yield (0, ValidationHelper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
    static ChangePasswordValidation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                password: Joi.string()
                    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
                    .required()
                    .messages({
                    "string.pattern.base": `Password should be between 3 to 30 characters and contain letters or numbers only`,
                    "string.empty": `Password cannot be empty`,
                    "any.required": `Password is required`,
                }),
                new_password: Joi.string()
                    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
                    .required()
                    .messages({
                    "string.pattern.base": `New Password should be between 3 to 30 characters and contain letters or numbers only`,
                    "string.empty": `New Password cannot be empty`,
                    "any.required": `New Password is required`,
                }),
            });
            const isValid = yield (0, ValidationHelper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
    static coinValidation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                coin: Joi.number()
                    .required(),
                type: Joi.string()
                    .required()
            });
            const isValid = yield (0, ValidationHelper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
}
exports.default = AuthValidation;
