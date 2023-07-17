import { Router } from "express";
import AuthValidation from "../../validators/app/AuthValidation";
import { AuthController } from "../../controllers/User/AuthController";
import { UserController } from "../../controllers/User/UserController";
import Authentication from "../../Middlewares/Authnetication";

class UserRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.post();
    this.get();
  }

  public post() {
    this.router.post(
      "/coin-update",
      AuthValidation.coinValidation,
      Authentication.user,
     UserController.coinUpdate
    );
    
  }
  public get() {}
}

export default new UserRoutes().router;
