import createHttpError from "http-errors";
import restaurantModel from "../../models/restaurant/restaurantModel.js";

export const singleRestaurantController = async (req, res, next) => {
    const id = req.params.id;
    try {
        const Restaurant= await restaurantModel.findOne({ _id: id });
        // console.log(Restaurants);
         if (!Restaurant) throw createHttpError(401, "No Record Found");
        res.status(200).json(Restaurant);
    } catch (error) {
        next(error);
    }
};