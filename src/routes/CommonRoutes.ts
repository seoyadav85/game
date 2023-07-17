import { Router } from "express";
import { CommonController } from "../controllers/CommonController";


class CommonRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.post();
    this.get();
  }

  public post() {}
  public get() {
    this.router.get(
      "/category-list",
    CommonController.categoryList
    );
  }
}

export default new CommonRoutes().router;
