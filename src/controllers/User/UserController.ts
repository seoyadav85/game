import User from "../../models/User";
import _RS from "../../helpers/ResponseHelper";
import Auth from "../../Utils/Auth";
import GameRecord from "../../models/GameRecord";
export class UserController {
  /**
         * @api {post} /api/app/user/coin-update Coin Update
         * @apiVersion 1.0.0
         * @apiName Coin Update
         * @apiGroup App-auth
         * @apiParam {Number} coin Coin.
         * @apiParam {Number} coin Coin.
         * @apiParamExample {json} Normal-signUp-Request-Example:
         * {"coin":20,"type":"Wheel"}
         * @apiSuccessExample {json} Success-Response:
         *{"status":200,"statusText":"SUCCESS","message":"Coin Updated Succsessfully","data":{"user":{"_id":"6453f2a423db131d315b5c43","coin":20,"email":"qwe@gmail.com","password":"$2b$10$OvGaVXf9P6kJ05.24YlcG.bsJFcxZV2IrVHEkpRLxDhSKXGfj.WSG","userName":"Test","created_at":"2023-05-04T18:00:04.154Z","updated_at":"2023-05-04T18:00:04.154Z","__v":0,"id":"6453f2a423db131d315b5c43"},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTNmMmE0MjNkYjEzMWQzMTViNWM0MyIsImVtYWlsIjoicXdlQGdtYWlsLmNvbSIsImlhdCI6MTY4MzIyNDI0MywiZXhwIjoxNjgzMzEwNjQzfQ.wN4k_PkVohdmt2ctzZorO_bmSfIsHCeuorh1s6h8np8"},"exeTime":566}
         * @apiErrorExample {json} Error-Response Not Found
         * {"status":404,"statusText":"NOTFOUND","message":"User not exist ,Please check the credentials","data":{},"exeTime":271}
         * @apiValidationErrorExample {json} Validation Error-Response :
         * {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"coin\" is required"]}}

         */
  static async coinUpdate(req, res, next) {
    const startTime = new Date().getTime();
    const { coin,type } = req.body;
    try {
      let isUserExist = await User.findOne({
        _id: req.user.id,
      });
      if (!isUserExist) {
        return _RS.notFound(
          res,
          "NOTFOUND",
          "User not exist ,Please check the credentials",
          {},
          startTime
        );
      }
    
    isUserExist.coin =  isUserExist.coin + coin
    isUserExist.save()
    await GameRecord.create({
      name:type,coin:coin
    })
      return _RS.ok(
        res,
        "SUCCESS",
        "Coin Updated Successfully",
        isUserExist ,
        startTime
      );
    } catch (err) {
      next(err);
    }
  }



  
}
