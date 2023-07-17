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
exports.AuthController = void 0;
const ResponseHelper_1 = require("../../helpers/ResponseHelper");
const Auth_1 = require("../../Utils/Auth");
const Admin_1 = require("../../models/Admin");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
class AuthController {
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const startTime = new Date().getTime();
            const { email, password } = req.body;
            try {
                let isUserExist = yield Admin_1.default.findOne({
                    email: email,
                });
                if (!isUserExist) {
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "Please enter the correct email", isUserExist, startTime);
                }
                const isPasswordValid = yield Auth_1.default.comparePassword(password, isUserExist.password);
                if (!isPasswordValid) {
                    return ResponseHelper_1.default.badRequest(res, "BADREQUEST", "Invalid password", {}, startTime);
                }
                const payload = {
                    id: isUserExist._id,
                    email: isUserExist.email,
                };
                const token = yield Auth_1.default.getToken(payload, "1d", next);
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Login successfully", { user: isUserExist, token }, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const startTime = new Date().getTime();
            const { email, password, name, phoneNumber } = req.body;
            try {
                let user = yield Admin_1.default.findOne({
                    $and: [{ email: email }],
                });
                if (!user) {
                    user = yield Admin_1.default.create({
                        email: "admin@yopmail.com",
                        password: yield Auth_1.default.encryptPassword("123456"),
                        name: "Admin",
                        phoneNumber: "919632587412",
                    });
                    return ResponseHelper_1.default.created(res, "CREATED", "SignUp sucessfully");
                }
                return ResponseHelper_1.default.conflict(res, "CONFLICT", "User already exist with this email", user, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static getProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const startTime = new Date().getTime();
            try {
                let getAdmin = yield Admin_1.default.findOne({
                    _id: req.user.id,
                });
                if (!getAdmin) {
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "User not exist , go to signup page", getAdmin, startTime);
                }
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Get Profile Successfully", getAdmin, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const startTime = new Date().getTime();
            const { old_password, new_password } = req.body;
            try {
                console.log("called");
                console.log(req.user);
                const admin = yield Admin_1.default.findById(req.user.id);
                const isPasswordCurrentCorrect = yield Auth_1.default.comparePassword(old_password, admin.password);
                if (!isPasswordCurrentCorrect) {
                    return ResponseHelper_1.default.badRequest(res, "BADREQUEST", "Old password does not match", {}, startTime);
                    // return next(
                    //   new AppError("Old password does not match", RESPONSE.HTTP_BAD_REQUEST)
                    // );
                }
                const encryptedPassword = yield Auth_1.default.encryptPassword(new_password);
                admin.password = encryptedPassword;
                yield admin.save();
                console.log("done");
                return ResponseHelper_1.default.ok(res, "SUCCESS", "password changed successfully", {}, startTime);
                // res.status(RESPONSE.HTTP_OK).json({
                //   status: RESPONSE.HTTP_OK,
                //   message: "password changed successfully",
                //   data: {},
                // });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static updateProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const startTime = new Date().getTime();
            const { email, name, profilePic } = req.body;
            try {
                let getAdmin = yield Admin_1.default.findOne({
                    _id: req.user.id,
                });
                if (!getAdmin) {
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "User not exist , go to signup page", getAdmin, new Date().getTime());
                }
                getAdmin.name = name ? name : getAdmin.name,
                    getAdmin.email = email ? email : getAdmin.email,
                    getAdmin.profilePic = profilePic ? profilePic : getAdmin.profilePic,
                    getAdmin.save();
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Update Profile Successfully", getAdmin, startTime);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static forgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            try {
                let admin = yield Admin_1.default.findOne({ email: email });
                if (!admin) {
                    let msg = "admin not found.";
                    return ResponseHelper_1.default.notFound(res, "SUCCESS", msg, admin, new Date().getTime());
                }
                const otp = yield Auth_1.default.generateOtp();
                admin.verification_code = 1000;
                // admin.verification_code_expiry_time = otp.otpExpiresTime;
                admin.save();
                // let { options: mailOptions = {} }: any = mailConfig || {};
                // mailOptions.to = email;
                // mailOptions.subject = "Forgot Password";
                // mailOptions.html = `Hi Admin, Please Verify the OTP ${otp.otp}`;
                // var transport = mailConfig;
                // var transporter = nodemailer.createTransport(transport);
                // const jj = transporter.sendMail(mailOptions, function (err_email) {
                //   if (err_email) {
                //     console.log(err_email);
                //   } else {
                //     console.log(`Registration email has been successfully sent to.`);
                //   }
                // });
                // console.log(jj, "jj");
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Please check mail id , send otp on mail", {}, new Date().getTime());
            }
            catch (error) {
                next(error);
            }
        });
    }
    static verifyOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            const otp = req.body.otp;
            const currentTime = new Date();
            try {
                let admin = yield Admin_1.default.findOne({ email: email });
                console.log(admin, "admin");
                if (!admin) {
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "not found", {}, new Date().getTime());
                }
                if (admin.verification_code != otp) {
                    return ResponseHelper_1.default.badRequest(res, "BADREQUEST", "Invalid OTP", {}, new Date().getTime());
                }
                admin.verification_code = null;
                admin.verification_code_expiry_time = null;
                admin.save();
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Please check mail id , send otp on mail", {}, new Date().getTime());
            }
            catch (error) {
                next(error);
            }
        });
    }
    static resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                let user = yield Admin_1.default.findOne({ email });
                console.log(user, "uuuuuuuuuuuu");
                if (!user) {
                    let msg = "User not found";
                    return ResponseHelper_1.default.notFound(res, "notFound", msg, {}, new Date().getTime());
                }
                user.password = yield Auth_1.default.encryptPassword(password);
                yield user.save();
                let msg = "Password changed successfully.";
                return ResponseHelper_1.default.ok(res, "SUCCESS", msg, {}, new Date().getTime());
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.AuthController = AuthController;
