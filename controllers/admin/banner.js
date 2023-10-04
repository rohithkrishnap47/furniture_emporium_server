const Banner = require("../../models/bannerModel");
const bannerModal = require("../../models/bannerModel")


// create banner
const createBanner = async (bannerData) => {
    return bannerModal.findOne({ bannerId: bannerData.bannerId })
        .then((banner) => {
            // if (banner) {
            //     return {
            //         statusCode: 401,
            //         message: "Banner with the same ID already exists",
            //         data: banner,
            //     };
            // } else {
                const newBanner = new bannerModal({
                    bannerId: bannerData.bannerId,
                    bannerImage: bannerData.bannerImage,
                    description: bannerData.description,
                    bannerTitle: bannerData.bannerTitle,

                });
                newBanner.save();
                return {
                    statusCode: 200,
                    message: "Banner created successfully",
                };
            
        })
        .catch((error) => {
            return {
                statusCode: 500,
                message: "Internal Server Error",
                error: error.message,
            };
        });
};

// GET all banners

const getAllBanners = () => {
    return bannerModal.find({})
        .then((banners) => {
            return {
                statusCode: 200,
                message: "Banners retrieved successfully",
                data: banners,
            };
        })
        .catch((error) => {
            return {
                statusCode: 500,
                message: "Internal Server Error",
                error: error.message,
            };
        });
};

// GET Banner by Id
const getBannerById = (bannerId) => {
    return bannerModal.findById(bannerId)
        .then((banner) => {
            if (!banner) {
                return {
                    statusCode: 404,
                    message: "Banner not found",
                };
            }
            return {
                statusCode: 200,
                message: "Banner retrieved successfully",
                data: banner,
            };
        })
        .catch((error) => {
            return {
                statusCode: 500,
                message: "Internal Server Error",
                error: error.message,
            };
        });
};

// UPDATE banner
const updateBanner = (bannerId, updatedBannerData) => {
    return bannerModal.findByIdAndUpdate(
        bannerId,
        updatedBannerData,
        { new: true }
    )
        .then((banner) => {
            if (!banner) {
                return {
                    statusCode: 404,
                    message: "Banner not found",
                };
            }
            return {
                statusCode: 200,
                message: "Banner updated successfully",
                data: banner,
            };
        })
        .catch((error) => {
            return {
                statusCode: 500,
                message: "Internal Server Error",
                error: error.message,
            };
        });
};


// DELETE banner
const deleteBanner = (bannerId) => {
    console.log("ban",bannerId);
    return Banner.findOneAndDelete(bannerId)
        .then((banner) => {
            if (!banner) {
                return {
                    statusCode: 404,
                    message: "Banner Not Found"
                };

            }
            return {
                statusCode: 200,
                message: "Banner created ,Hurray!!"
            };

        })
        .catch((error) => {
            return {
                statusCode: 500,
                message: "Iternal server ERROR :( ",
                // console.error(error),
                error: error.message,
            };
        });
};

// _____________________________________________________________________
module.exports = {
    createBanner, 
    getAllBanners, 
    getBannerById, 
    updateBanner, 
    deleteBanner
};