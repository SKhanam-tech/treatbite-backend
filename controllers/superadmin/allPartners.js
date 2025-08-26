import partnerModel from "../../models/auth/partnerModel.js";

export const allPartnersController = async (req, res, next) => {
    try {
          // Run an aggregation pipeline on the partnerModel collection
        const result = await partnerModel.aggregate([
             // 1. $match → filter only documents where role = "Partner"
            { $match: { role: "Partner" } },
              // 2. $project → exclude sensitive/unnecessary fields from the output
              //$project is stage operator---used to select, exclude, or reshape fields in documents.
             {
                $project: {
                    password: 0,
                    verifyOtp: 0,
                    verifyOtpExpireAt: 0,
                    resetOtp: 0,
                    resetOtpExpireAt: 0,
                    createdAt: 0,
                    updatedAt: 0,
                    __v: 0
                }
            },
             // 3. $lookup → perform a JOIN-like operation with the "restaurants" collection
            {
                $lookup: {
                    from: "restaurants", // collection name in MongoDB (lowercase plural of model)
                    localField: "_id", //  partner's _id in partnerModel
                    foreignField: "partner", // "partner" field inside restaurants collection
                     // optional pipeline applied to joined collection
                     // pipeline: [...] inside $lookup → pipeline stages for the joined collection
                     //pipeline is an official option inside $lookup.
                    pipeline: [
                        { $project: { _id: 0, restaurantName: 1, restaurantAddress: 1, isPublished: 1 } }
                    ],
                    as: "restaurants"  // output array field name for joined documents
                }
            }
        ]);

        res.status(200).json(result);

    } catch (error) {
        next(error);
    }
};