import { Router } from "express";
import AuthValidation from "../../validators/app/AuthValidation";
import { AuthController } from "../../controllers/User/AuthController";

class AuthRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.post();
    this.get();
  }

  public post() {
    this.router.post(
      "/login",
      AuthValidation.loginValidation,
      AuthController.login
    );
    this.router.post(
      "/forget-password",
      AuthValidation.forgetPasswordValidation,
      AuthController.forgetpassword
    );
    this.router.post(
      "/reset-password",
      AuthValidation.resetPasswordValidation,
      AuthController.resetPassword
    );
    this.router.post(
      "/verify-otp",
      AuthValidation.verifyOTPValidation,
      AuthController.verifyOTP
    );
  }
  public get() {}
}

export default new AuthRoutes().router;
