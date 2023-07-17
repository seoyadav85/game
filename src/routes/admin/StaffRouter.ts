import { Router } from "express";
import Authentication from "../../Middlewares/Authnetication";
import { StaffController } from "../../controllers/Admin/StaffController";

class StaffRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.post();
    this.get();
    this.put();
  }

  public post() {
    this.router.post(
      "/add-staff",
      Authentication.admin,
      StaffController.addStaff
    );
    this.router.post(
      "/change-password",
      Authentication.admin,
      StaffController.changePassword
    );
  }
  public get() {
    this.router.get("/list", Authentication.admin, StaffController.list);
  }
  public put() {
    this.router.put(
      "/edit-staff/:id",
      Authentication.admin,
      StaffController.editStaff
    );
    
  }
}

export default new StaffRouter().router;
