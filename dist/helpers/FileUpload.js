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
exports.FileUpload = void 0;
const Env_1 = require("../environments/Env");
const AWS = require("aws-sdk");
const fs = require("fs");
AWS.config.update({
    accessKeyId: (0, Env_1.env)().awsAccessKey,
    secretAccessKey: (0, Env_1.env)().awsSecretKey,
    region: (0, Env_1.env)().region,
});
class FileUpload {
    constructor() { }
    static uploadInS3(image, path) {
        return __awaiter(this, void 0, void 0, function* () {
            let folderPath = path;
            const imageRemoteName = `${folderPath}/image_${new Date().getTime()}.png`;
            try {
                const response = yield FileUpload.s3
                    .putObject({
                    Bucket: (0, Env_1.env)().s3Bucket,
                    Body: fs.readFileSync(image.path),
                    ContentType: image.type,
                    Key: imageRemoteName,
                })
                    .promise();
                // .then((response) => {
                //   console.log(response);
                //   return imageRemoteName;
                // })
                // .catch((err) => {
                //   console.log("failed:", err);
                //   return false;
                // });
                console.log(response, "response");
                return imageRemoteName;
            }
            catch (err) {
                console.log("Failed:", err);
                return false;
            }
            // return FileUpload.s3
            //   .putObject({
            //     Bucket: env().s3Bucket,
            //     Body: fs.readFileSync(image.path),
            //     ContentType: image.type,
            //     Key: imageRemoteName,
            //   })
            //   .promise()
            //   .then((response) => {
            //     console.log(response);
            //     return imageRemoteName;
            //   })
            //   .catch((err) => {
            //     console.log("failed:", err);
            //     return false;
            //   });
        });
    }
    static deleteFromS3(path) {
        const params = {
            Bucket: (0, Env_1.env)().s3Bucket,
            Delete: {
                Objects: [
                    {
                        Key: path,
                    },
                ],
            },
        };
        return FileUpload.s3
            .deleteObjects(params)
            .promise()
            .then((response) => {
            console.log("Deleted success", response);
            return true;
        })
            .catch((error) => {
            console.log("failed:", error);
            return false;
        });
    }
}
exports.FileUpload = FileUpload;
FileUpload.s3 = new AWS.S3();
exports.default = FileUpload;
