import { Router } from "express";
import Authentication from "../../Middlewares/Authnetication";
import { StaffController } from "../../controllers/Admin/StaffController";
import { CategoryController } from "../../controllers/Admin/CategoryController";

class CategoryRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.post();
    this.get();
    this.put();
  }

  public post() {
    this.router.post(
      "/add-category",
      Authentication.admin,
      CategoryController.addStaff
    );
    
  }
  public get() {
    this.router.get("/list", Authentication.admin, CategoryController.list);
  }
  public put() {
    this.router.put(
      "/edit-category/:id",
      Authentication.admin,
      CategoryController.editStaff
    );
    
  }
}

export default new CategoryRouter().router;
