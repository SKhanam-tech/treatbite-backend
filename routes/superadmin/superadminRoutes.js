import express from "express"
import { registerController } from "../../controllers/superadmin/register.js";
import { isAuthenticated, isAuthorized } from "../../middlewares/auth.js";
import Roles from "../../constants/role.js";
import { partnerApprovalToggleController } from "../../controllers/superadmin/partnerApprovalToggle.js";
import { allPartnersController } from "../../controllers/superadmin/allPartners.js";

const router = express.Router()

//  http://localhost:4000/api/superadmin/register
router.post("/register", registerController);

router.post("/partnerApprovalToggle/:id",isAuthenticated,isAuthorized([Roles.SUPER_ADMIN]), partnerApprovalToggleController);

router.get("/allPartners",isAuthenticated,isAuthorized([Roles.SUPER_ADMIN]), allPartnersController)

export default router