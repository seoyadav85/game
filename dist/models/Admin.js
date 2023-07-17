"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Schema = mongoose.Schema;
const Admin = new Schema({
    userName: {
        type: String,
    },
    name: {
        type: String,
    },
    phoneNumber: {
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
    profilePic: {
        type: String,
        default: null
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
    verification_code: {
        type: Number,
        default: null
    }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
mongoose.plugin(aggregatePaginate);
exports.default = (0, mongoose_1.model)("Admin", Admin);
