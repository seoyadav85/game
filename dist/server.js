"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Env_1 = require("./environments/Env");
const Routes_1 = require("./routes/Routes");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
// let’s you use the cookieParser in your application
class Server {
    constructor() {
        this.app = express();
        this.setConfigurations();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
    }
    setConfigurations() {
        this.setMongodb();
        this.enableCors();
        this.configBodyParser();
    }
    setMongodb() {
        mongoose
            .connect((0, Env_1.env)().dbUrl, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .then(() => {
            console.log("Database connected");
        })
            .catch((e) => {
            console.log(e);
            console.log("failed");
        });
    }
    enableCors() {
        this.app.use(cors({
            origin: true,
            credentials: true,
        }));
    }
    configBodyParser() {
        this.app.use(express.urlencoded({ extended: true, limit: "10mb" }));
        this.app.use(express.json({ limit: "10mb" }));
    }
    setRoutes() {
        this.app.use("/api-doc", express.static(path.resolve(process.cwd() + "/apidoc")));
        this.app.use("/api", Routes_1.default);
    }
    error404Handler() {
        this.app.use((req, res) => {
            res.status(404).json({
                message: "Route not found test",
                status: 404,
            });
        });
    }
    handleErrors() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus;
            res.status(errorStatus || 500).json({
                message: error.message || "Something went wrong!!",
                statusText: error.statusText || "ERROR",
                status: errorStatus || 500,
                data: {},
            });
        });
    }
}
exports.Server = Server;
