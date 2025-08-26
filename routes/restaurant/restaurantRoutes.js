import express from 'express'
import { isAuthenticated, isAuthorized } from '../../middlewares/auth.js';
import { uploadImages } from '../../middlewares/uploadImages.js';
import { addRestaurantController } from '../../controllers/restaurant/addRestaurant.js';
import Roles from '../../constants/role.js';
import { publishToggleRestaurantController } from '../../controllers/restaurant/publishToggleRestaurant.js';
import { allRestaurantsController } from '../../controllers/restaurant/allRestaurants.js';
import { singleRestaurantController } from '../../controllers/restaurant/singleRestaurant.js';
import { partnerRestaurantsController } from '../../controllers/restaurant/partnerRestaurants.js';
import { updateRestaurantController } from '../../controllers/restaurant/updateRestaurant.js';

const router = express.Router();

router.post("/add",uploadImages,isAuthenticated,isAuthorized([Roles.PARTNER]),addRestaurantController)

// publish and unpublish a Restaurant
router.post("/publishToggleRestaurant/:id",isAuthenticated,isAuthorized([Roles.PARTNER]), publishToggleRestaurantController);

// get all restaurants general
//  http://localhost:4000/api/restaurant/allRestaurants
router.get("/allRestaurants", allRestaurantsController);

// get single  Restaurant
router.get("/getrestaurant/:id", singleRestaurantController);

// get all restaurants of particular partner
router.get("/PartnerRestaurants",isAuthenticated,isAuthorized([Roles.PARTNER, Roles.SUPER_ADMIN]), partnerRestaurantsController);

router.put("/update/:id",isAuthenticated,isAuthorized([Roles.PARTNER]),uploadImages, updateRestaurantController)

export default router