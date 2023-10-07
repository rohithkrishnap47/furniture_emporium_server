const Banner = require("../../models/bannerModel");
const bannerModal = require("../../models/bannerModel")
// app.use(express.json());

// create banner
const createBanner = async (bannerData) => {
    const required = ["bannerTitle", "bannerImage", "description"]
    const validationError = bodyRequiredDataValidator(bannerData, required);
    if (validationError) {
        return {
            statusCode: 400,
            error: validationError,
        }
    }
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
    const required = ["bannerTitle", "bannerImage", "description"]
    const validationError = bodyRequiredDataValidator(updatedBannerData, required);
    if (validationError) {
        return {
            statusCode: 400,
            error: validationError,
        }
    }
    return bannerModal.findByIdAndUpdate(
        bannerId,
        {
            bannerImage: updatedBannerData.bannerImage,
            description: updatedBannerData.description,
            bannerTitle: updatedBannerData.bannerTitle,
        },
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
    console.log("banDelete", bannerId);
    return Banner.findByIdAndDelete(bannerId)
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
//------------------------------------------------------------------------------
// Validator function
const bodyRequiredDataValidator = (body, fields) => {
    let required = []
    fields.forEach((key) => {
      if ([undefined, '', null].includes(body[key])) {
        required.push(key)
      }
    })
    return required.length ? { "missing": required } : undefined
  }
  //------------------------------------------------------------------------------ 


// _____________________________________________________________________
module.exports = {
    createBanner,
    getAllBanners,
    getBannerById,
    updateBanner,
    deleteBanner
};