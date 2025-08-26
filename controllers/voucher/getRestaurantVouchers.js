import voucherModel from "../../models/restaurant/voucherModel.js";

export const getRestaurantVouchersController = async (req, res, next) => {
  const restaurantId=req.params.id
  try {
    const getVouchers = await voucherModel.find({
      restaurant: restaurantId,
    });
    res.json(getVouchers);
  } catch (error) {  
     next(error);
  }
};