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
exports.SocketService = void 0;
const socket_io_1 = require("socket.io");
const Jwt = require("jsonwebtoken");
const User_1 = require("../models/User");
class SocketService {
    constructor() {
        this.io;
        this.sockets = [];
        this.onlineUsers = [];
        this.blockData;
    }
    init(server) {
        this.io = new socket_io_1.Server(server, {
            maxHttpBufferSize: 100000000,
            connectTimeout: 5000,
            transports: ["websocket", "polling"],
            pingInterval: 25 * 1000,
            pingTimeout: 5000,
        });
        // console.log('io', this.io);
    }
    provideSocket(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("provide socket for id", id);
            let userSocket = this.sockets[id];
            return userSocket;
        });
    }
    globalSocket() {
        return this.io;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            //This middleware is used to validate the user using jwt token
            this.io.use((socket, next) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const query = socket.handshake.query;
                    const token = query.token;
                    console.log("query ", JSON.stringify(socket.handshake.query));
                    if (!token) {
                        console.log("if token not present");
                        // return next(new AppError('You are not logged in, please login again', RESPONSE.HTTP_UNAUTHORIZED));
                    }
                    Jwt.verify(token, "expathy", (err, decoded) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            let currentUser = yield User_1.default.findById(decoded).lean();
                            socket.data.user = currentUser;
                            console.log("currentUser", currentUser);
                            next();
                        }
                    }));
                }
                catch (error) {
                    next(error);
                }
            }));
            this.io.on("connection", (socket) => __awaiter(this, void 0, void 0, function* () {
                this.onlineUsers.push(socket.id);
                this.sockets[socket.data.user._id] = socket;
                socket.on("eventList", (data, callback) => {
                    // callback("hello");
                    // EventController.list(data, callback);
                });
                socket.on("disconnect", (data) => __awaiter(this, void 0, void 0, function* () {
                    console.log("user disconnect.");
                    let socket_key = this.getKeyByValue(this.sockets, socket);
                    delete this.sockets[socket_key];
                    this.onlineUsers.splice(this.onlineUsers.indexOf(socket.id), 1);
                    console.log("online users after disconnect", this.onlineUsers.length);
                }));
            }));
        });
    }
    getKeyByValue(object, value) {
        return Object.keys(object).find((key) => object[key] === value);
    }
}
exports.SocketService = SocketService;
SocketService.activeSockets = [];
let socketObj = new SocketService();
exports.default = socketObj;
