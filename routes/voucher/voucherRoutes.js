import express from "express"
import { isAuthenticated, isAuthorized } from "../../middlewares/auth.js"
import { purchaseVoucherController } from "../../controllers/voucher/purchaseVoucher.js"
import { voucherCodeVerifyController } from "../../controllers/voucher/voucherCodeVerify.js"
import Roles from "../../constants/role.js"
import { getRestaurantVouchersController } from "../../controllers/voucher/getRestaurantVouchers.js"
import { voucherSearchController } from "../../controllers/voucher/voucherSearch.js"
// import Roles from "./../../"

const router = express.Router()

// http://localhost:4000/api/voucher/voucherPurchase/689795ca29efa96baf7fc79e
router.post("/voucherPurchase/:id",isAuthenticated, purchaseVoucherController)

router.post("/voucherCodeVerify", isAuthenticated,isAuthorized([Roles.PARTNER]), voucherCodeVerifyController) 

router.get("/restaurantVouchers/:id", isAuthenticated,isAuthorized([Roles.PARTNER]), getRestaurantVouchersController)

router.post("/vouchersearch/:key", isAuthenticated,isAuthorized([Roles.PARTNER]), voucherSearchController)
export default router