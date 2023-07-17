// import { validate } from "../../helpers/ValidationHelper";
import * as Joi from "joi";
import { NextFunction } from "express";
// import { ReqInterface, ResInterface } from "../../interfaces/RequestInterface"
// import _RS from "../../helpers/ResponseHelper"
import { validate } from "../helpers/ValidationHelper";
import { ReqInterface, ResInterface } from "../interfaces/RequestInterface";

class UserValidation {
  static async loginValidation(
    req: ReqInterface,
    res: ResInterface,
    next: NextFunction
  ) {
    const schema = Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      // password: Joi.string()
      //   .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      //   .required()
      //   .messages({
      //     "string.pattern.base": `Password should be between 3 to 30 characters and contain letters or numbers only`,
      //     "string.empty": `Password cannot be empty`,
      //     "any.required": `Password is required`,
      //   }),
    });
    const isValid = await validate(req.body, res, schema);
    if (isValid) {
      next();
    }
  }

}

export default UserValidation;
