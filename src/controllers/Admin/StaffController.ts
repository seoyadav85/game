import User from "../../models/User";
import _RS from "../../helpers/ResponseHelper";
import Auth from "../../Utils/Auth";

export class StaffController {
  static async list(req, res, next) {
    // await User.updateMany({}, { $set: { isApprove: true } });
    try {
      const startTime = new Date().getTime();

      let sort: any = [["createdAt", -1]];
      if (req.query.sort) {
        const map = Array.prototype.map;
        sort = Object.keys(req.query.sort).map((key) => [
          key,
          req.query.sort[key],
        ]);
        console.log(sort, "sort");
      }

      const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10,
        collation: {
          locale: "en",
        },
      };
      let filteredQuery: any = {};
      if (req.query.search && req.query.search.trim()) {
        console.log(req.query.search, "req.query.search");
        // filteredQuery = {
        //   name: {
        //     $regex: req.query.search,
        //     $options: "$i",
        //   },
        // };
        filteredQuery.$or = [
          {
            name: {
              $regex: new RegExp(req.query.search),
              $options: "i",
            },
          },
          {
            email: {
              $regex: new RegExp(req.query.search),
              $options: "i",
            },
          },
          {
            phoneNumber: {
              $regex: new RegExp(req.query.search),
              $options: "i",
            },
          },
        ];
      }
      if (req.query.start_date && req.query.end_date) {
        filteredQuery.createdAt = {
          $gte: new Date(req.query.start_date),
          $lte: new Date(req.query.end_date),
        };
      }

      if (req.query.start_date && req.query.start_date.trim()) {
        filteredQuery.createdAt = { $gte: new Date(req.query.start_date) };
      }

      if (req.query.end_date && req.query.end_date.trim()) {
        filteredQuery.createdAt = { $lte: new Date(req.query.end_date) };
      }
      let query: any = [
        {
          $match: {
            is_delete: false,
          },
        },
        {
          $match: filteredQuery,
        },
        {
          $sort: {
            created_at: -1,
          },
        },
      ];
      var myAggregate = User.aggregate(query);
      const list = await User.aggregatePaginate(myAggregate, options);
      // const list = await User.find({ type: "Expact" }).sort({ created_at: -1 });
      return _RS.ok(res, "SUCCESS", "List", { list: list }, startTime);
    } catch (err) {
      next(err);
    }
    // try {
    //   // const startTime = new Date().getTime();
    //   // const list = await User.find({ type: "Staff" }).sort({ created_at: -1 });
    //   // return _RS.ok(res, "SUCCESS", "List", { list: list }, startTime);
    // } catch (err) {
    //   next(err);
    // }
  }
  static async addStaff(req, res, next) {
    try {
      const startTime = new Date().getTime();
      const { password, userName, name,coin } = req.body;
      const getStaff = await User.findOne({
       userName: userName ,
      });
      if (getStaff)
        return _RS.conflict(
          res,
          "COFLICT",
          "Satff already exist with this email or user name",
          getStaff,
          startTime
        );
      const data = {
        name: name,
        userName: userName,
        type: "Staff",
        isApprove: true,
        password: await Auth.encryptPassword(password),
        coin:coin
      };
      const user = await new User(data).save();
      return _RS.created(res, "SUCCESS", "Add Staff Successfully", user);
      // return _RS.ok(res, "SUCCESS", "List", { list: list }, startTime);
    } catch (err) {
      next(err);
    }
  }
  static async editStaff(req, res, next) {
    try {
      const startTime = new Date().getTime();
      const { userName, name ,coin} = req.body;
      const getStaff = await User.findOne({ _id: req.params.id });
      if (!getStaff)
        return _RS.notFound(
          res,
          "NOTFOUND",
          "Staff not found",
          getStaff,
          startTime
        );
        (getStaff.userName = userName ? userName : getStaff.userName),
        (getStaff.name = name ? name : getStaff.name),
        (getStaff.coin = coin ? coin : getStaff.coin),
        getStaff.save();
      return _RS.ok(
        res,
        "SUCCESS",
        "Update Staff Successfully",
        getStaff,
        startTime
      );
    } catch (err) {
      next(err);
    }
  }


  static async changePassword(req, res, next) {
    try {
      const startTime = new Date().getTime();
      // const id = req.params.id;
      const { password, id } = req.body;
      const getGuest = await User.findOne({ _id: id });
      if (!getGuest)
        return _RS.notFound(
          res,
          "NOTFOUND",
          "Guest not found",
          getGuest,
          startTime
        );
      (getGuest.password = password
        ? await Auth.encryptPassword(password)
        : await Auth.encryptPassword("123456")),
        getGuest.save();

      return _RS.ok(
        res,
        "SUCCESS",
        "Change Password Successfully",
        getGuest,
        startTime
      );
      // return _RS.ok(res, "SUCCESS", "List", { list: list }, startTime);
    } catch (err) {
      next(err);
    }
  }
}
