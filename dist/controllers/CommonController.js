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
exports.CommonController = void 0;
const ResponseHelper_1 = require("../helpers/ResponseHelper");
const Category_1 = require("../models/Category");
class CommonController {
    /**
          * @api {get} /api/common/category-list Game Category List
          * @apiVersion 1.0.0
          * @apiName Game Category
          * @apiGroup Common
          * @apiSuccessExample {json} Success-Response:
          *{
     "status": 200,
     "statusText": "SUCCESS",
     "message": "Category List",
     "data": {
         "data": [
             {
                 "is_active": true,
                 "is_delete": false,
                 "_id": "64b43883050cfc72e218f4e9",
                 "name": "hh",
                 "created_at": "2023-07-16T18:35:47.293Z",
                 "updated_at": "2023-07-16T18:35:47.293Z",
                 "__v": 0
             }
         ]
     },
     "exeTime": 198
 }
         
 
          */
    static categoryList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const startTime = new Date().getTime();
            const { coin } = req.body;
            try {
                let isUserExist = yield Category_1.default.find({});
                if (!isUserExist) {
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "User not exist ,Please check the credentials", {}, startTime);
                }
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Category List", isUserExist, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.CommonController = CommonController;
