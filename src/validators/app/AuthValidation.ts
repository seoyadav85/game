// import { validate } from "../../helpers/ValidationHelper";
import * as Joi from "joi";
import { NextFunction } from "express";
// import { ReqInterface, ResInterface } from "../../interfaces/RequestInterface"
// import _RS from "../../helpers/ResponseHelper"
import { validate } from "../../helpers/ValidationHelper";
import { ReqInterface, ResInterface } from "../../interfaces/RequestInterface";
enum UserTypeRole {
  Expact = "Expact",
  Psychologist = "Psychologist",
}
enum LoginTypeRole {
  Email = "Email",
  Google = "Google",
  Facebook = "Facebook",
  Apple = "Apple",
}
class AuthValidation {
  static async loginValidation(
    req: ReqInterface,
    res: ResInterface,
    next: NextFunction
  ) {
    const schema = Joi.object().keys({
      userName: Joi.string().required(),
      password: Joi.string().required(),
    });
    const isValid = await validate(req.body, res, schema);
    if (isValid) {
      next();
    }
  }
  static async signUpValidation(
    req: ReqInterface,
    res: ResInterface,
    next: NextFunction
  ) {
    const schema = Joi.object().keys({
      email: Joi.string().required().email(),
      // password: Joi.string().regex(strongPasswordRegex).error(stringPassswordError).required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required()
        .messages({
          "string.pattern.base": `Password should be between 3 to 30 characters and contain letters or numbers only`,
          "string.empty": `Password cannot be empty`,
          "any.required": `Password is required`,
        }),
      userName: Joi.string().required(),
    });
    const isValid = await validate(req.body, res, schema);
    if (isValid) {
      next();
    }
  }
  static async profileValidation(
    req: ReqInterface,
    res: ResInterface,
    next: NextFunction
  ) {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      phoneNumber: Joi.string()
        .required()
        .pattern(/^[0-9]+$/)
        .max(15)
        .min(9),
    });
    const isValid = await validate(req.body, res, schema);
    if (isValid) {
      next();
    }
  }
  static async forgetPasswordValidation(
    req: ReqInterface,
    res: ResInterface,
    next: NextFunction
  ) {
    const schema = Joi.object().keys({
      userName: Joi.string().required(),
    });
    const isValid = await validate(req.body, res, schema);
    if (isValid) {
      next();
    }
  }
  static async verifyOTPValidation(
    req: ReqInterface,
    res: ResInterface,
    next: NextFunction
  ) {
    const schema = Joi.object().keys({
      userName: Joi.string().required(),
      otp: Joi.string().required(),
    });
    const isValid = await validate(req.body, res, schema);
    if (isValid) {
      next();
    }
  }
  static async resetPasswordValidation(
    req: ReqInterface,
    res: ResInterface,
    next: NextFunction
  ) {
    const schema = Joi.object().keys({
      userName: Joi.string().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required()
        .messages({
          "string.pattern.base": `Password should be between 3 to 30 characters and contain letters or numbers only`,
          "string.empty": `Password cannot be empty`,
          "any.required": `Password is required`,
        }),
    });
    const isValid = await validate(req.body, res, schema);
    if (isValid) {
      next();
    }
  }
  static async ChangePasswordValidation(
    req: ReqInterface,
    res: ResInterface,
    next: NextFunction
  ) {
    const schema = Joi.object().keys({
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required()
        .messages({
          "string.pattern.base": `Password should be between 3 to 30 characters and contain letters or numbers only`,
          "string.empty": `Password cannot be empty`,
          "any.required": `Password is required`,
        }),
      new_password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required()
        .messages({
          "string.pattern.base": `New Password should be between 3 to 30 characters and contain letters or numbers only`,
          "string.empty": `New Password cannot be empty`,
          "any.required": `New Password is required`,
        }),
    });
    const isValid = await validate(req.body, res, schema);
    if (isValid) {
      next();
    }
  }
  static async coinValidation(
    req: ReqInterface,
    res: ResInterface,
    next: NextFunction
  ) {
    const schema = Joi.object().keys({
      coin: Joi.number()
        .required(),
      type: Joi.string()
        .required()
       
    });
    const isValid = await validate(req.body, res, schema);
    if (isValid) {
      next();
    }
  }
}

export default AuthValidation;
