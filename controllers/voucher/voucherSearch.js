import voucherModel from "../../models/restaurant/voucherModel.js";

export const voucherSearchController = async (req, res, next) => {
  try {
    const { restaurant } = req.body; // Restaurant ID expected from client in the request body
  
    // Extract voucher code from route params and convert to number
    //req.params.key is a string that came from the URL
    //parseInt()...JavaScript function to convert a string → integer (number).
    const key = parseInt(req.params.key, 10);

    // Check for valid number and non-empty restaurant ID
    if (!restaurant || isNaN(key)) {
      return res.status(400).json({ message: "Invalid restaurant ID or voucher code" });
    }

    // Search for the voucher with both voucherCode and restaurant match
    const result = await voucherModel.findOne({
      voucherCode: key,
      restaurant: restaurant
    })
    .populate({
      path: 'donor',
      select: 'fullName email'
    });

    if (!result) {
      return res.status(404).json({ message: "Voucher not found" });
    }

    // Return the result
    res.status(200).json(result);

  } catch (error) {
    next(error); // Forward error to global error handler
  }
};