export declare class AuthController {
    /**
           * @api {post} /api/app/auth/login Login
           * @apiVersion 1.0.0
           * @apiName Login
           * @apiGroup App-auth
           * @apiParam {String} email Email.
           * @apiParam {String} password Password.
           * @apiParam {String} type  User Type ("Expact,Psychologist").
           * @apiParamExample {json} Normal-signUp-Request-Example:
           * {"userName":"qwe@gmail.com","password":"abc123"}
           * @apiSuccessExample {json} Success-Response:
           *{"status":200,"statusText":"SUCCESS","message":"Login Successfully","data":{"user":{"_id":"6453f2a423db131d315b5c43","email":"qwe@gmail.com","password":"$2b$10$OvGaVXf9P6kJ05.24YlcG.bsJFcxZV2IrVHEkpRLxDhSKXGfj.WSG","userName":"Test","created_at":"2023-05-04T18:00:04.154Z","updated_at":"2023-05-04T18:00:04.154Z","__v":0,"id":"6453f2a423db131d315b5c43"},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTNmMmE0MjNkYjEzMWQzMTViNWM0MyIsImVtYWlsIjoicXdlQGdtYWlsLmNvbSIsImlhdCI6MTY4MzIyNDI0MywiZXhwIjoxNjgzMzEwNjQzfQ.wN4k_PkVohdmt2ctzZorO_bmSfIsHCeuorh1s6h8np8"},"exeTime":566}
           * @apiErrorExample {json} Error-Response Not Found
           * {"status":404,"statusText":"NOTFOUND","message":"User not exist ,Please check the credentials","data":{},"exeTime":271}
           * @apiValidationErrorExample {json} Validation Error-Response :
           * {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"email\" is required","\"password\" is required","\"type\" is required"]}}
  
           */
    static login(req: any, res: any, next: any): Promise<void>;
    /**
           * @api {post} /api/app/auth/forget-password Forget Password
           * @apiVersion 1.0.0
           * @apiName Forget Password
           * @apiGroup App-auth
           * @apiParam {String} email Email.
           * @apiParamExample {json} Request-Example:
           * {"userName":"qwe@gmail.com"}
           * @apiSuccessExample {json} Success-Response:
           * {"status":200,"statusText":"SUCCESS","message":"Send OTP on this email pls verify the OTP ","data":{},"exeTime":258}
           * @apiErrorExample {json} Error-Response Not Found
           * {"status":404,"statusText":"NOTFOUND","message":"User not exist with this email","data":{},"exeTime":331}
           * @apiValidationErrorExample {json} Validation Error-Response :
           * {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"email\" is required"]}}
  
           */
    static forgetpassword(req: any, res: any, next: any): Promise<void>;
    /**
     * @api {post} /api/app/auth/verify-otp Verify OTP
     * @apiVersion 1.0.0
     * @apiName Verify OTP
     * @apiGroup App-auth
     * @apiParam {String} email Email.
     * @apiParam {String} otp OTP.
     * @apiParamExample {json} Request-Example:
     * {"userName":"qwe@gmail.com", "otp":"1234"}
     * @apiSuccessExample {json} Success-Response:
     * {"status":200,"statusText":"SUCCESS","message":"Verify OTP Successfully","data":{},"exeTime":232}
     * @apiErrorExample {json} Error-Response Not Found
     * {"status":404,"statusText":"NOTFOUND","message":"User not exist with this email","data":{},"exeTime":331}
     * @apiInvalidOTPExample {json} Invalid OTP
     * {"status":400,"statusText":"BADREQUEST","message":"Invalid OTP","data":{},"exeTime":260}
     * @apiValidationErrorExample {json} Validation Error-Response :
     * {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"email\" is required"]}}
     */
    static verifyOTP(req: any, res: any, next: any): Promise<void>;
    /**
     * @api {post} /api/app/auth/reset-password Reset Password
     * @apiVersion 1.0.0
     * @apiName Reset Password
     * @apiGroup App-auth
     * @apiParam {String} email Email.
     * @apiParam {String} password Password.
     * @apiParamExample {json} Request-Example:
     * {"userName":"qwe@gmail.com", "password":"abc124"}
     * @apiSuccessExample {json} Success-Response:
     * {"status":200,"statusText":"SUCCESS","message":"Password Changed Successfully","data":{},"exeTime":433}
     * @apiErrorExample {json} Error-Response Not Found
     * {"status":404,"statusText":"NOTFOUND","message":"User not exist with this email","data":{},"exeTime":331}
     * @apiValidationErrorExample {json} Validation Error-Response :
     * {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"email\" is required"]}}
     */
    static resetPassword(req: any, res: any, next: any): Promise<void>;
}
