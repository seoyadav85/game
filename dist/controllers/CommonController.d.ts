export declare class CommonController {
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
    static categoryList(req: any, res: any, next: any): Promise<void>;
}
