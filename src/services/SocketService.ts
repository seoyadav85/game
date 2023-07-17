import { Server, Socket } from "socket.io";
import * as Jwt from "jsonwebtoken";
import User from "../models/User";

export class SocketService {
  io: any;
  public sockets: any;
  public onlineUsers: any;
  public blockData: any;
  static activeSockets: any = [];

  constructor() {
    this.io;
    this.sockets = [];
    this.onlineUsers = [];
    this.blockData;
  }

  init(server) {
    this.io = new Server(server, {
      maxHttpBufferSize: 100000000,
      connectTimeout: 5000,
      transports: ["websocket", "polling"],
      pingInterval: 25 * 1000,
      pingTimeout: 5000,
    });

    // console.log('io', this.io);
  }
  async provideSocket(id) {
    console.log("provide socket for id", id);
    let userSocket = this.sockets[id];
    return userSocket;
  }
  globalSocket() {
    return this.io;
  }
  async connect() {
    //This middleware is used to validate the user using jwt token
    this.io.use(async (socket: Socket, next) => {
      try {
        const query: any = socket.handshake.query;
        const token: string = query.token;

        console.log("query ", JSON.stringify(socket.handshake.query));
        if (!token) {
          console.log("if token not present");
          // return next(new AppError('You are not logged in, please login again', RESPONSE.HTTP_UNAUTHORIZED));
        }
        Jwt.verify(token, "expathy", async (err, decoded) => {
          if (err) {
            console.log(err);
          } else {
            let currentUser = await User.findById(decoded).lean();
            socket.data.user = currentUser;
            console.log("currentUser", currentUser);
            next();
          }
        });
      } catch (error) {
        next(error);
      }
    });
    this.io.on("connection", async (socket: Socket) => {
      this.onlineUsers.push(socket.id);
      this.sockets[socket.data.user._id] = socket;

     
      socket.on("eventList", (data, callback) => {
        // callback("hello");
        // EventController.list(data, callback);
      });

      socket.on("disconnect", async (data) => {
        console.log("user disconnect.");
        let socket_key = this.getKeyByValue(this.sockets, socket);
        delete this.sockets[socket_key];
        this.onlineUsers.splice(this.onlineUsers.indexOf(socket.id), 1);
        console.log("online users after disconnect", this.onlineUsers.length);
      });
    });
  }

  getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }
}
let socketObj = new SocketService();
export default socketObj;
