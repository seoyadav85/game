import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../interfaces/RequestInterface";
declare class UserValidation {
    static loginValidation(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
export default UserValidation;
