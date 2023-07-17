import _RS from "../helpers/ResponseHelper";
import Category from "../models/Category";

export class CommonController {

    
   /**
         * @api {get} /api/common/category-list Game Category List
         * @apiVersion 1.0.0
         * @apiName Game Category 
         * @apiGroup Common
         * @apiSuccessExample {json} Success-Response:
         *{
    "status": 200,
    "statusText": "SUCCESS",
    "message": "Category List",
    "data": {
        "data": [
            {
                "is_active": true,
                "is_delete": false,
                "_id": "64b43883050cfc72e218f4e9",
                "name": "hh",
                "created_at": "2023-07-16T18:35:47.293Z",
                "updated_at": "2023-07-16T18:35:47.293Z",
                "__v": 0
            }
        ]
    },
    "exeTime": 198
}
        

         */
         static async categoryList(req, res, next) {
            const startTime = new Date().getTime();
            const { coin } = req.body;
            try {
              let isUserExist = await Category.find({
                
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
            
         
              return _RS.ok(
                res,
                "SUCCESS",
                "Category List",
                isUserExist ,
                startTime
              );
            } catch (err) {
              next(err);
            }
          }
}
