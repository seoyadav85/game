"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Schema = mongoose.Schema;
const Category = new Schema({
    name: {
        type: String,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    is_delete: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
mongoose.plugin(aggregatePaginate);
exports.default = (0, mongoose_1.model)("Category", Category);
