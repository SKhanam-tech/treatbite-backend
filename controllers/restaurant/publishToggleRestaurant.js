import createHttpError from "http-errors";
import bankInfoModel from "../../models/bank/bankInfoModel.js"
import restaurantModel from "../../models/restaurant/restaurantModel.js";

export const publishToggleRestaurantController = async (req, res, next) => {

    //restaurant id
    const id = req.params.id;
    const userId = req.user._id;
    // console.log(userId,"user id")
    try {
        const bankDetail = await bankInfoModel.findOne({ partnerId: userId });
        if (!bankDetail.isBankInfo) throw createHttpError(401, "Add Bank Detail then Publish");
        let data = await restaurantModel.findById(id);
         if (!data.isCompleteInfo) throw createHttpError(401, "Complete Restaurant Details then Publish");
        if (data.isPublished) {
            data.isPublished = false;
            data = await data.save();
            return res.status(200).json({
                message: "Restaurant is unPublished Successfully",
                data: data,
            });

        } else {
            data.isPublished = true;
            data = await data.save();
            return res.status(200).json({
                message: "Restaurant is Published Successfully",
                data: data
            });
        }
    } catch (error) {
        next(error);
    }
};