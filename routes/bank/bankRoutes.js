import express from "express"
import { isAuthenticated, isAuthorized } from "../../middlewares/auth.js"
import { getBankInfoController } from "../../controllers/bank/getBankInfo.js"
import Roles from "../../constants/role.js"
import { updateBankInfoController } from "../../controllers/bank/updateBankInfo.js"


const router = express.Router()

router.get("/getBankInfo",isAuthenticated,isAuthorized([Roles.PARTNER]), getBankInfoController)

router.put("/update/:id",isAuthenticated,isAuthorized([Roles.PARTNER]), updateBankInfoController)

export default router