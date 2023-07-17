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
exports.StaffController = void 0;
const User_1 = require("../../models/User");
const ResponseHelper_1 = require("../../helpers/ResponseHelper");
const Auth_1 = require("../../Utils/Auth");
class StaffController {
    static list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // await User.updateMany({}, { $set: { isApprove: true } });
            try {
                const startTime = new Date().getTime();
                let sort = [["createdAt", -1]];
                if (req.query.sort) {
                    const map = Array.prototype.map;
                    sort = Object.keys(req.query.sort).map((key) => [
                        key,
                        req.query.sort[key],
                    ]);
                    console.log(sort, "sort");
                }
                const options = {
                    page: req.query.page || 1,
                    limit: req.query.limit || 10,
                    collation: {
                        locale: "en",
                    },
                };
                let filteredQuery = {};
                if (req.query.search && req.query.search.trim()) {
                    console.log(req.query.search, "req.query.search");
                    // filteredQuery = {
                    //   name: {
                    //     $regex: req.query.search,
                    //     $options: "$i",
                    //   },
                    // };
                    filteredQuery.$or = [
                        {
                            name: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            email: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            phoneNumber: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                    ];
                }
                if (req.query.start_date && req.query.end_date) {
                    filteredQuery.createdAt = {
                        $gte: new Date(req.query.start_date),
                        $lte: new Date(req.query.end_date),
                    };
                }
                if (req.query.start_date && req.query.start_date.trim()) {
                    filteredQuery.createdAt = { $gte: new Date(req.query.start_date) };
                }
                if (req.query.end_date && req.query.end_date.trim()) {
                    filteredQuery.createdAt = { $lte: new Date(req.query.end_date) };
                }
                let query = [
                    {
                        $match: {
                            is_delete: false,
                        },
                    },
                    {
                        $match: filteredQuery,
                    },
                    {
                        $sort: {
                            created_at: -1,
                        },
                    },
                ];
                var myAggregate = User_1.default.aggregate(query);
                const list = yield User_1.default.aggregatePaginate(myAggregate, options);
                // const list = await User.find({ type: "Expact" }).sort({ created_at: -1 });
                return ResponseHelper_1.default.ok(res, "SUCCESS", "List", { list: list }, startTime);
            }
            catch (err) {
                next(err);
            }
            // try {
            //   // const startTime = new Date().getTime();
            //   // const list = await User.find({ type: "Staff" }).sort({ created_at: -1 });
            //   // return _RS.ok(res, "SUCCESS", "List", { list: list }, startTime);
            // } catch (err) {
            //   next(err);
            // }
        });
    }
    static addStaff(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                const { password, userName, name, coin } = req.body;
                const getStaff = yield User_1.default.findOne({
                    userName: userName,
                });
                if (getStaff)
                    return ResponseHelper_1.default.conflict(res, "COFLICT", "Satff already exist with this email or user name", getStaff, startTime);
                const data = {
                    name: name,
                    userName: userName,
                    type: "Staff",
                    isApprove: true,
                    password: yield Auth_1.default.encryptPassword(password),
                    coin: coin
                };
                const user = yield new User_1.default(data).save();
                return ResponseHelper_1.default.created(res, "SUCCESS", "Add Staff Successfully", user);
                // return _RS.ok(res, "SUCCESS", "List", { list: list }, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static editStaff(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                const { userName, name, coin } = req.body;
                const getStaff = yield User_1.default.findOne({ _id: req.params.id });
                if (!getStaff)
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "Staff not found", getStaff, startTime);
                (getStaff.userName = userName ? userName : getStaff.userName),
                    (getStaff.name = name ? name : getStaff.name),
                    (getStaff.coin = coin ? coin : getStaff.coin),
                    getStaff.save();
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Update Staff Successfully", getStaff, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                // const id = req.params.id;
                const { password, id } = req.body;
                const getGuest = yield User_1.default.findOne({ _id: id });
                if (!getGuest)
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "Guest not found", getGuest, startTime);
                (getGuest.password = password
                    ? yield Auth_1.default.encryptPassword(password)
                    : yield Auth_1.default.encryptPassword("123456")),
                    getGuest.save();
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Change Password Successfully", getGuest, startTime);
                // return _RS.ok(res, "SUCCESS", "List", { list: list }, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.StaffController = StaffController;
