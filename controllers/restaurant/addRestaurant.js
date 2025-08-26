import restaurantModel from "../../models/restaurant/restaurantModel.js";


export const addRestaurantController = async (req, res, next) => {

    try {
        const {
            restaurantName,
            restaurantAddress,
            restaurantContact,
            voucherMin,
            voucherMax,
            restaurantMenu,
            about,
            otherServices,
            cuisine,
            type,
            dietary,
            features,
        } = req.body;


        const partnerId = req.user._id;

        // Prepare image data from req.files
        let coverPhotoData = null;
        let ambiencePhotosData = [];

        if (req.files?.coverPhoto) {
            const file = req.files.coverPhoto[0];
            coverPhotoData = file.path;
        }

        if (req.files?.ambiencePhotos && req.files.ambiencePhotos.length > 0) {
            ambiencePhotosData = req.files.ambiencePhotos.map(file => file.path);
        }



        const restaurantData = await restaurantModel.create({
            restaurantName,
            restaurantContact,
            restaurantAddress,
            about,
            isCompleteInfo: true,
            voucherMin,
            voucherMax,
            cuisine: cuisine ? JSON.parse(cuisine) : [],
            type: type ? JSON.parse(type) : [],
            dietary: dietary ? JSON.parse(dietary) : [],
            features: features ? JSON.parse(features) : [],
            restaurantMenu: restaurantMenu ? JSON.parse(restaurantMenu) : [],
            otherServices,
            partner: partnerId,
            coverPhoto: coverPhotoData,
            ambiencePhotos: ambiencePhotosData,
        });

        res.status(201).json({
            message: "Restaurant added successfully",
            data: restaurantData,
        });

    } catch (error) {


        // Pass error to global error handler
        next(error);
    }
};