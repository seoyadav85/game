import { Router } from "express";
import AuthRouter from "./admin/AuthRouter";
import StaffRouter from "./admin/StaffRouter";
import AuthRoutes from "./app/AuthRoutes";
import UserRoutes from "./app/UserRoutes";
import Category from "../models/Category";
import CategoryRouter from "./admin/CategoryRouter";
import CommonRoutes from "./CommonRoutes";



class Routes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.app();
    this.admin();
    this.common();
  }

  app() {
    this.router.use("/app/auth", AuthRoutes);
    this.router.use("/app/user", UserRoutes);

  }
  admin() {
    this.router.use("/admin/auth", AuthRouter);
    this.router.use("/admin/staff", StaffRouter);
    this.router.use("/admin/category", CategoryRouter);
  }
  common() {
    this.router.use("/common", CommonRoutes);
  }
}
export default new Routes().router;
