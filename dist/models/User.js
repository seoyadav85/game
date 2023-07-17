"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Schema = mongoose.Schema;
const User = new Schema({
    userName: {
        type: String,
    },
    firstName: {
        type: String,
    },
    name: {
        type: String,
    },
    mobileNumber: {
        type: String,
    },
    countryCode: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    isApprove: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: String,
        default: null,
    },
    dob: {
        type: String,
    },
    gender: {
        type: String,
    },
    address: {
        type: String,
    },
    coin: {
        type: Number,
        default: 0
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    is_delete: {
        type: Boolean,
        default: false,
    },
    isSync: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
mongoose.plugin(aggregatePaginate);
exports.default = (0, mongoose_1.model)("User", User);
